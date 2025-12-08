import React, { useState } from "react";
import ItemGroup from '../items/itemGroup';
import Container from "~/common/components/ui/container";
import {Layout, Model} from 'flexlayout-react';
import "flexlayout-react/style/light.css";  
import "./visualization.css";

const visualization = () => {
  const json = {
      global: {},
      borders: [],
      layout: {
          type: "row",
          weight: 100,
          children: [
              {
                  type: "tabset",
                  weight: 50,
                  children: [
                      {
                          className:'item1',
                          type: "tab",
                          name: "Chart 1",
                          component: "placeholder",
                          // component: defaultItem || 'chart'
                      },
                      {
                          className:'item2',
                          type: "tab",
                          name: "Chart 2",
                          component: "placeholder",
                          // component: defaultItem || 'chart'
                      }
                  ]
              },
              {
                  type: "tabset",
                  weight: 50,
                  children: [
                      {
                          type: "tab",
                          name: "Two",
                          component: "placeholder",
                      }
                  ]
              }
          ]
      }
  };
  const model = Model.fromJson(json);
  const [items, setItems] = useState();
  
  const factory = (node: any) => {
    const component = node.getComponent();

    if (component === "placeholder") {
      return <div>{node.getName()}</div>;
    }
  }

  return (
      <div className="flex flex-col h-screen py-2 px-2">
        <div className="h-[10%]">
          <ItemGroup />
        </div>

        <div className="h-[90%] border-2">
          <Layout model={model} factory={factory} />
        </div>
      </div>
  )
}

export default visualization;
