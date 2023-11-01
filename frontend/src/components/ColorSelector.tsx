export interface ColorSelectorProps {
  currentColor: string;
  setCurrentColor: (c: string) => void;
  availableColors: string[];
}

export const ColorSelector = ({
  currentColor,
  setCurrentColor,
  availableColors,
}: ColorSelectorProps) => {
  return (
    <div className="color-selector">
      {availableColors.map((color) => (
        <div
          className={
            "color-button" + (currentColor === color ? " selected-color" : "")
          }
          key={color}
          onClick={() => setCurrentColor(color)}
        >
          <div className="color" style={{ backgroundColor: color }}></div>
        </div>
      ))}
    </div>
  );
};
