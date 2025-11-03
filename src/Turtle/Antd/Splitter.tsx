import React from 'react';
import {Flex, Splitter} from 'antd';
import {useTurtleTheme} from "@Turtle/Theme/useTurleTheme";
import TopBarWrapper from "@Turtle/Components/TopBarWrapper";


export function SplitterWithHeader({topbar, children}) {


    const {theme} = useTurtleTheme();

    const splitterHeight = theme.GetSplitterBigHeight();


    // Clone children and add overflow styles

    const enhancedChildren = React.Children.map(children, (child: any) => {
        if (React.isValidElement(child) && child.type === Splitter.Panel) {

            const _child: any = child

            return React.cloneElement(child, {
                style: {
                    overflow: "auto",
                    display: "flex",
                    flexDirection: "column",
                    paddingBottom: "50px",
                    ..._child.props.style, // Preserve original styles
                }
            } as any);
        }
        return child;
    });

    return (
        <Flex
            vertical
            style={{
                height: "100dvh",
                overflow: "hidden",
            }}
        >
            <Flex style={{flexShrink: 0}}>
                <TopBarWrapper>
                    {topbar}
                </TopBarWrapper>
            </Flex>

            <Splitter
                style={{
                    flex: 1,
                    minHeight: 0,
                }}
            >
                {enhancedChildren}
            </Splitter>
        </Flex>
    )
}