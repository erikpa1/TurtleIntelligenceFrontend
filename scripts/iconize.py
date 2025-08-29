import os
import sys
from lxml import etree
from svgpathtools import parse_path
from svgpathtools import Path as SvgPath

ICONS_DIR = "../public/icons"
OUTPUT_DIR = "../src/Turtle/Icons"

def normalize_svg(input_file, output_file, component_name="TurtleExperimentalIcon"):
    tree = etree.parse(input_file)
    root = tree.getroot()

    # --- Get viewBox or fallback ---
    viewbox = root.get("viewBox")
    if viewbox:
        min_x, min_y, width, height = map(float, viewbox.strip().split())
    else:
        width = float(root.get("width", 1024))
        height = float(root.get("height", 1024))
        min_x, min_y = 0, 0

    # --- Scale ---
    scale_x = 1024.0 / width
    scale_y = 1024.0 / height
    scale = min(scale_x, scale_y)

    def transform_path(d):
        path = parse_path(d)
        new_path = SvgPath(*[seg.scaled(scale) for seg in path])
        new_path = new_path.translated(complex(-min_x * scale, -min_y * scale))
        return new_path.d()

    # --- Transform all <path> ---
    for el in root.iter():
        if el.tag.endswith("path") and "d" in el.attrib:
            el.attrib["d"] = transform_path(el.attrib["d"])

    root.set("viewBox", "0 0 1024 1024")
    root.attrib["width"] = "1024"
    root.attrib["height"] = "1024"

    # --- Collect d values ---
    paths = [el.attrib["d"] for el in root.iter() if el.tag.endswith("path") and "d" in el.attrib]
    d_primary = paths[0] if paths else ""
    d_secondary = paths[1] if len(paths) > 1 else ""

    # --- React code ---
    react_code = f"""import {{ {component_name} }} from "@Turtle/Icons/A";

export default function Icon{component_name}(props: any = {{}}) {{
  return (
    <{component_name} dPrimary="{d_primary}" dSecondary="{d_secondary}" {{...props}} />
  );
}}
"""

    with open(output_file, "w") as f:
        f.write(react_code)

    print(f"✅ Converted {input_file} -> {output_file}")


def main():
    # --- list available icons ---
    icons = [f for f in os.listdir(ICONS_DIR) if f.endswith(".svg")]
    if not icons:
        print("❌ No SVG icons found in public/icons")
        return

    print("\nAvailable icons:")
    for i, name in enumerate(icons, 1):
        print(f"{i}. {name}")

    # --- ask user ---
    choice = input("\nEnter number of icon to convert: ")
    try:
        idx = int(choice) - 1
        if idx < 0 or idx >= len(icons):
            raise ValueError
    except ValueError:
        print("❌ Invalid choice")
        return

    svg_file = os.path.join(ICONS_DIR, icons[idx])
    icon_name = os.path.splitext(icons[idx])[0]
    output_file = os.path.join(OUTPUT_DIR, f"{icon_name}.tsx")

    # PascalCase for component
    component_name = "".join(word.capitalize() for word in icon_name.split("-"))

    normalize_svg(svg_file, output_file, component_name)


if __name__ == "__main__":
    main()
