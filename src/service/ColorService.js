class ColorService {
  /**
   * Calculate the luminance based on RGB values and return black or white as the contrasting color.
   *
   * @param {number} r - The red value of the RGB color.
   * @param {number} g - The green value of the RGB color.
   * @param {number} b - The blue value of the RGB color.
   * @return {string} The contrasting color ("black" or "white").
   */
  static getContrastingColor(r, g, b) {
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255

    return luminance > 0.5 ? "#000" : "#fff"
  }
}

export default ColorService
