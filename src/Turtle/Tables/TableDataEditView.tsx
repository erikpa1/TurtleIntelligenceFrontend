import Spreadsheet from "react-spreadsheet";


export default function TableDataEditView() {

    const columnLabels = ["Flavour", "Food"];
    const rowLabels = ["Item 1", "Item 2"];
    const data = [
        [{value: "Vanilla"}, {value: "Chocolate"}],
        [{value: "Strawberry"}, {value: "Cookies"}],
    ];
    return (
        <Spreadsheet
            data={data}
            columnLabels={columnLabels}
            rowLabels={rowLabels}
        />
    );
}