import AeeWrapper from "@Turtle/Data/AeeWrapper";
import aee from "@Turtle/Data/Aee";
import SimEntity from "@TurtleSim/SimModelWorldDock/Data/SimEntity";
import React from "react";
import {Empty, Flex, Form, Tabs} from "antd";

import {EntityNameProperty, EntityTypeProperty} from "@TurtleSim/SimModelWorldDock/BehProps/Common";
import SimFactory from "@TurtleSim/Factories/SimFactory";
import ErrorBoundary, {CompactErrorView} from "@Turtle/Components/ErrorBoundary";
import {useTranslation} from "react-i18next";
import RunningSimTab from "@TurtleSim/SimModelWorldDock/RunningSimTab";
import TurtleEmpty from "@Turtle/Components/TurtleEmpty";
import AIDescriptionItem from "@Turtle/ReflectiveUI/AIDescItem";
import TopBarWrapper, {TopBarWrapperNoFlex} from "@Turtle/Components/TopBarWrapper";


export default function WorldRightBar() {

    const [t] = useTranslation()

    const [activeTab, setActiveTab] = React.useState("config")

    const [entity, setEntity] = React.useState<SimEntity | null>(null)


    function entityPicked(entity: SimEntity) {
        setEntity(entity)
    }

    return (
        <AeeWrapper
            aee={aee}
            WorldEntityClicked={entityPicked}
            SelectEntityFromWorld={entityPicked}
        >

            <TopBarWrapperNoFlex>
                <Tabs
                    centered
                    size={"small"}
                    defaultValue={"config"}
                    onChange={setActiveTab}
                    items={[
                        {
                            label: t("config"),
                            key: "config"
                        },
                        {
                            label: t("events"),
                            key: "events"
                        }
                    ]}
                />
            </TopBarWrapperNoFlex>

            <div
                style={{
                    padding: "15px",
                    paddingTop: 0,
                }}
            >


                {
                    activeTab === "config" && (
                        entity ? (
                            <ErrorBoundary>
                                <_EntityEditProps entity={entity}/>
                            </ErrorBoundary>
                        ) : (
                            <div style={{
                                marginTop: "30vh"
                            }}>
                                <Empty/>
                            </div>
                        )
                    )
                }

                {
                    activeTab === "events" && (
                        <ErrorBoundary>
                            <RunningSimTab/>
                        </ErrorBoundary>
                    )
                }
            </div>

        </AeeWrapper>
    )
}


interface _EntityEditPropsProps {
    entity: SimEntity
}

function _EntityEditProps({entity}: _EntityEditPropsProps) {


    return (
        <Form
            layout={'horizontal'}
            key={entity.uid}
            labelCol={{span: 10}}
            wrapperCol={{span: 15}}
        >
            <EntityNameProperty entity={entity}/>

            <AIDescriptionItem entity={entity} attribute={"aiDescription"}/>

            <EntityTypeProperty entity={entity}/>

            <_ViewDispatcher entity={entity}/>

            {/*{*/}
            {/*    entity.type == "buffer" && (*/}
            {/*        <BufferBehProperties*/}
            {/*            entity={entity}*/}
            {/*        />*/}
            {/*    )*/}
            {/*}*/}


        </Form>
    )
}

function _ViewDispatcher({entity}: _EntityEditPropsProps) {


    const childToShow = React.useMemo(() => {
        const component = SimFactory.GetRightBarComponent(entity.type)
        let child = <></>
        if (component) {
            child = React.createElement(component, {entity})
        }
        return child
    }, [entity])

    return (
        childToShow
    )
}