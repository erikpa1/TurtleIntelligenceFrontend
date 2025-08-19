import React from "react"
import TopBarWrapper from "@Turtle/Components/TopBarWrapper";
import {Button, Flex, Tabs} from "antd";
import {useTranslation} from "react-i18next";


export default function ThemeEditView() {

    const [t] = useTranslation()

    return (
        <div>
            <TopBarWrapper>

                {/*<Segmented*/}
                {/*    defaultActiveKey="UI"*/}
                {/*    size={"small"}*/}
                {/*    items={[*/}
                {/*        {*/}
                {/*            label: t("ui"),*/}
                {/*            key: "ui"*/}
                {/*        }, {*/}
                {/*            label: "3D",*/}
                {/*            key: "3D"*/}
                {/*        },*/}
                {/*    ]}*/}
                {/*/>*/}

                <Flex>
                    <Button>
                        Save
                    </Button>
                </Flex>
            </TopBarWrapper>

        </div>
    )
}