import { getCookie, setCookie } from "typescript-cookie";
import { Buffer } from "buffer";

class SpotifyHandler implements ISpotifyHandler {
  private clientId: string = "ec66e7d6e6044da2a3287fd76dc1074c";
  private clientSecret: string = "ff96f7ea27a141009f68c0c10c0ef3ea";
  private apiUrl: string = "https://api.spotify.com/v1/";
  private token?: string;
  private refreshToken?: string;
  public user?: User;
  public device?: Device;
  private country: string = "RU";

  constructor() {
    this.token = getCookie("SpotifyToken");
    this.refreshToken = getCookie("SpotifyRefreshToken");
    if (this.token && this.refreshToken) {
      this.doRefreshToken();
      setInterval(() => this.doRefreshToken(), 3600000);
    }
  }

  /**
   * Выполняет запросы к серверу Spotify
   * @param {RequestInfo} info
   * @param {RequestInit} config
   * @returns {Promise<IExecuteResponse>}
   */
  private async execute(
    info: RequestInfo,
    config?: RequestInit
  ): Promise<IExecuteResponse> {
    if (!config)
      config = {
        method: "GET",
        headers: { Authorization: "Bearer " + this.token },
      };
    return fetch(info, config)
      .then(
        async (x) =>
          ({ ok: x.ok, response: await x.json() } as IExecuteResponse)
      )
      .catch((err) => {
        console.error(err.message);
        return { ok: false, response: err } as IExecuteResponse;
      });
  }

  /**
   * Запрашивает токен для неавторизованного пользователя и сохраняет его в куки
   * @returns {Promise<this>}
   */
  public async getToken(): Promise<this> {
    if (this.token) return this;
    const config: RequestInit = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          Buffer.from(this.clientId + ":" + this.clientSecret).toString(
            "base64"
          ),
      },
      method: "POST",
      body: "grant_type=client_credentials",
    };
    const res = await this.execute(
      "https://accounts.spotify.com/api/token",
      config
    );
    if (res.ok) {
      const data = res.response as IGetToken;
      this.token = data.access_token;
      setCookie("SpotifyToken", this.token);
    }
    return this;
  }

  /**
   * Запрашивает токен по коду пользователя и сохраняет его в куки
   * @param {string} code
   * @returns {Promise<this>}
   */
  public async getUserToken(code: string): Promise<this> {
    if (this.token) return this;
    const config: RequestInit = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          Buffer.from(this.clientId + ":" + this.clientSecret).toString(
            "base64"
          ),
      },
      method: "POST",
      body: `grant_type=authorization_code&code=${code}&redirect_uri=http://localhost:3000/auth`,
    };
    const res = await this.execute(
      "https://accounts.spotify.com/api/token",
      config
    );
    if (res.ok) {
      const data = res.response as IGetUserToken;
      this.token = data.access_token;
      this.refreshToken = data.refresh_token;
      setCookie("SpotifyToken", this.token);
      setCookie("SpotifyRefreshToken", this.refreshToken);
      setInterval(() => this.doRefreshToken(), data.expires_in * 1000);
    }
    return this;
  }

  /**
   * Обновляет токен пользователя и сохраняет его в куки
   * @returns {Promise<this>}
   */
  private async doRefreshToken(): Promise<this> {
    if (!this.refreshToken) return this;
    console.log("refresh token");
    const config: RequestInit = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          Buffer.from(this.clientId + ":" + this.clientSecret).toString(
            "base64"
          ),
      },
      method: "POST",
      body: `grant_type=refresh_token&refresh_token=${this.refreshToken}`,
    };
    const res = await this.execute(
      "https://accounts.spotify.com/api/token",
      config
    );
    if (res.ok) {
      const data = res.response as IGetUserToken;
      this.token = data.access_token;
      setCookie("SpotifyToken", this.token);
    }
    return this;
  }

  /**
   * Возвращает доступные категории
   * @returns {Promise<Category[]>}
   */
  public async getCategories(): Promise<Category[]> {
    if (!this.token) throw new Error("No Token");
    const url =
      this.apiUrl + `browse/categories?country=${this.country}&limit=50`;
    const res = await this.execute(url);
    if (!res.ok) throw new Error("err");
    const data = res.response as IGetCategories;
    return data.categories.items;
  }

  /**
   * Возвращает плейлсты по категории
   * @param {string} categoryId
   * @returns {Promise<IGetPlaylistsWithCategory>}
   */
  public async getPlaylistsWithCategory(
    categoryId: string
  ): Promise<IGetPlaylistsWithCategory> {
    if (!this.token) throw new Error("No Token");
    const url =
      this.apiUrl +
      `browse/categories/${categoryId}/playlists?country=${this.country}&limit=10`;
    const res = await this.execute(url);
    if (!res.ok) throw new Error("err");
    const data = res.response as IGetPlaylistsWithCategory;
    return data;
  }

  /**
   * Возвращает элементы плейлиста
   * @param {string} playlistId
   * @returns {Promise<TrackInfo[]>}
   */
  public async getPlaylistItems(playlistId: string): Promise<TrackInfo[]> {
    if (!this.token) throw new Error("No Token");
    const url = this.apiUrl + `playlists/${playlistId}/tracks?limit=20`;
    const res = await this.execute(url);
    if (!res.ok) throw new Error("err");
    const data = res.response as GetPlaylistItems;
    return data.items;
  }

  /**
   * Возвращает элементы по запросу
   * @param {string} query
   * @param {ItemType[]} searchType
   * @param {number} limit
   * @returns {Promise<ISearchResponse>}
   */
  public async search(
    query: string,
    searchType: ItemType[],
    limit: number = 20
  ): Promise<ISearchResponse> {
    if (!this.token) throw new Error("No Token");
    const type = searchType.join(",");
    const url = this.apiUrl + `search?q=${query}&type=${type}&limit=${limit}`;
    const res = await this.execute(url);
    if (!res.ok) throw new Error("error");
    const data = res.response as ISearchResponse;
    return data;
  }

  /**
   * Запрашивает объект авторизированного пользователя
   * @returns {Promise<this>}
   */
  public async getMe(): Promise<this> {
    if (!this.token) throw new Error("No Token");
    const url = this.apiUrl + `me?country=${this.country}`;
    const res = await this.execute(url);
    if (!res.ok) throw new Error("err");
    this.user = res.response as User;
    return this;
  }

  /**
   * Запрашивает названия доступных жанров
   * @returns {Promise<string[]>}
   */
  public async getAvailableGenreSeeds(): Promise<string[]> {
    if (!this.token) throw new Error("No Token");
    const url = this.apiUrl + `recommendations/available-genre-seeds`;
    const res = await this.execute(url);
    if (!res.ok) throw new Error("err");
    const data = res.response as IAvailableGenreSeeds;
    return data.genres;
  }

  /**
   * @deprecated
   * Запрашивает девайсы пользователя
   * @returns {Promise<this>}
   */
  public async getAvailableDevices(): Promise<this> {
    if (!this.token) throw new Error("No Token");
    const url = this.apiUrl + "me/player/devices";
    const res = await this.execute(url);
    if (!res.ok) throw new Error("err");
    const data = res.response as IGetAvailableDevices;
    this.device = data.devices.filter((item) => item.type === "Computer")[0];
    return this;
  }

  /**
   * @deprecated
   * Запрашивает рекоминдации
   * @returns {Promise<void>}
   */
  public async getRecommendations(): Promise<void> {
    if (!this.token) throw new Error("No Token");
    const url = this.apiUrl + `recommendations?seed_genres=classical,country`;
    const res = await this.execute(url);
    console.log(res);
  }

  /**
   * @deprecated
   * Запрашивает новые релизы
   * @returns {Promise<void>}
   */
  public async getNewReleases(): Promise<void> {
    if (!this.token) throw new Error("No Token");
    const url = this.apiUrl + `browse/new-releases?country=${this.country}`;
    const res = await this.execute(url);
    console.log(res);
  }
}

export default SpotifyHandler;
