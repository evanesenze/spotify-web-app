import React, { FC, useEffect, useState } from "react";
import randomColor from "randomcolor";
const Search: FC<ISearch> = ({
  spotifyHandler,
  user,
  setCurrentView,
  setFoundPlaylists,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    if (!user) return;
    loadContent();
  }, [user]);

  /**
   *Загружает контент страницы
   * @returns {Promise<void>}
   */
  const loadContent = async (): Promise<void> => {
    if (!spotifyHandler) return;
    const categories = await spotifyHandler.getCategories();
    setCategories(categories);
  };

  /**
   * Загружает плейлисты переданной категории
   * @param {string} categoryId
   * @param {string|undefined} categoryName
   * @returns {Promise<void>}
   */
  const selectCategory = async (
    categoryId: string,
    categoryName?: string
  ): Promise<void> => {
    if (!spotifyHandler) return;
    const playlists = await spotifyHandler.getPlaylistsWithCategory(categoryId);
    playlists.categoryName = categoryName;
    setFoundPlaylists((x) => playlists);
    setCurrentView("SearchOutput");
  };

  /**
   * Возвращает цвет hex который темнее/светлее на lum
   * @param {string} hex - Цвет hex [#123123]
   * @param {number} lum - Яркость нового цвета
   * @returns
   */
  const colorLuminance = (hex: string, lum: number = 0) => {
    hex = String(hex).replace(/[^0-9a-f]/gi, "");
    if (hex.length < 6)
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    let rgb = "#",
      c,
      i;
    for (i = 0; i < 3; i++) {
      c = parseInt(hex.substring(i * 2, 2), 16);
      c = Math.round(Math.min(Math.max(0, c + c * lum), 255)).toString(16);
      rgb += ("00" + c).substring(c.length);
    }
    return rgb;
  };

  return (
    <div className="categories_grid">
      {categories.map((item, index) => {
        const color = randomColor();
        const dark = colorLuminance(color, -0.7);
        return (
          <div
            style={{ backgroundColor: color }}
            className="category_card"
            key={index}
            onClick={() => selectCategory(item.id, item.name)}
          >
            <img
              className="category_card__img"
              width="100%"
              src={item.icons[0].url}
            />
            <span className="category_card__title">{item.name}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Search;
