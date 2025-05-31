import AeeWrapper from "@Turtle/Data/AeeWrapper";
import aee from "@Turtle/Data/Aee";
import Entity from "@Turtle/Data/Entity";
import React from "react";
import {Empty, Form} from "antd";

import {EntityNameProperty, EntityTypeProperty} from "@TurtleApp/Routes/WorldDock/EntitiesProps/Common";
import EntitiesFactory from "@TurtleApp/Factories/EntitiesFactory";


export default function WorldRightBar() {

    const [entity, setEntity] = React.useState<Entity | null>(null)

    function entityPicked(entity: Entity) {
        setEntity(entity)
    }

    return (
        <AeeWrapper
            aee={aee}
            WorldEntityClicked={entityPicked}
            SelectEntityFromWorld={entityPicked}
        >
            {
                entity ? <_EntityEditProps entity={entity}/> : (
                    <div style={{
                        marginTop: "30vh"
                    }}>
                        <Empty/>
                    </div>
                )
            }
        </AeeWrapper>
    )
}

interface _EntityEditPropsProps {
    entity: Entity
}

function _EntityEditProps({entity}: _EntityEditPropsProps) {


    const childToShow = React.useMemo(() => {
        const component = EntitiesFactory.GetRightBarComponent(entity.type)
        let child = <></>
        if (component) {
            child = React.createElement(component, {entity})
        }
        return child
    }, [entity])


    return (
        <Form
            layout={'horizontal'}
            key={entity.uid}
            labelCol={{span: 10}}
            wrapperCol={{span: 15}}
        >
            <EntityNameProperty entity={entity}/>

            <EntityTypeProperty entity={entity}/>

            {
                childToShow
            }

            {/*{*/}
            {/*    entity.type == "buffer" && (*/}
            {/*        <BufferEntitiyProperties*/}
            {/*            entity={entity}*/}
            {/*        />*/}
            {/*    )*/}
            {/*}*/}


        </Form>
    )
}