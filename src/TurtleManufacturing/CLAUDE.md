# TurtleManufacturing (frontend)

Ant Design (v6) UI for the inventory, BOM and Advanced Planning (MRP/APS)
backend. SAP-inspired layouts. Alias: `@TurtleManufacturing/*`.

Backend contracts: `../../../TurtleIntelligenceBackend/inventory/CLAUDE.md` and
`.../manufacutring/CLAUDE.md`.

## Layout

| Path | What |
|------|------|
| `Data/` | Entity classes (`Item`, `Bom`, `Demand`, `WorkCenter`, `Routing`) with `ToJson`/`FromJson`, and API clients (`ItemsApi`, `BomsApi`, `PlanningApi`) built on `@Turtle/Api/Turxios` |
| `Inventory/InventoryDock` (+ `COUItemDrawer`) | Material master list (KPI header, searchable table, drawer editor incl. MRP view) |
| `BomDock/BomDock` (+ `BomEditor`) | Master–detail BOM editor with editable components table + rolled-up cost |
| `Planning/DemandDock` | Independent demand table + drawer (product picker, date picker) |
| `Planning/WorkCentersDock` | Capacity resource table + drawer |
| `Planning/RoutingsDock` | Master–detail routing editor with operations table |
| `Planning/MrpDock` | Run MRP → tabs: Planned orders / Requirements (netting) / Exceptions |
| `Planning/ApsDock` (+ `ApsGantt`) | Run APS → tabs: Gantt / Work-center load / Operations |

## Wiring
- Routes: `ManufacturingRoutes.tsx`, spread into `src/AppRoutes.tsx`.
  `/inventory`, `/manufacturing/bom[/:bomUid]`, `/manufacturing/demand`,
  `/manufacturing/work-centers`, `/manufacturing/routings`,
  `/manufacturing/mrp`, `/manufacturing/aps`.
- Nav: `NavBarModules_Manufacturing.tsx` → tab added in
  `TurtleApp/TurtleAppsGallery.tsx` (groups: inventory / manufacturing /
  advanced planning).
- i18n keys in `public/translation/en.json`.

## Conventions used here
- CRUD dock = full-height `Flex` (`theme.GetSplitterBigHeight()`), KPI stat
  cards, `Table` + `Drawer` create/update form.
- Editors with child rows (BOM, Routing) use a `useRef` draft + version-bump
  re-render, and a master–detail `SplitterWithHeader`.
- Feedback via antd static `message` (no `App` provider in the tree).

## Where this is in SAP (screens)

| Dock | SAP screen |
|------|-----------|
| InventoryDock | Material master **MM01/MM03** (Basic + MRP views) |
| BomDock | Bill of Material **CS01/CS03**, multilevel **CS11/CS12** |
| RoutingsDock | Routing **CA01/CA03** |
| WorkCentersDock | Work center **CR01/CR03** |
| DemandDock | Demand mgmt **MD61**, sales order **VA01** |
| MrpDock | MRP run **MD01/MD02** + stock/requirements list **MD04** |
| ApsDock (Gantt) | PP-DS detailed scheduling board **/SAPAPO/CDPS0**; capacity planning table **MF50** |

Full field-level Turtle→SAP table mapping lives in the two backend `CLAUDE.md`
files.
