import type { IJsonModel, IJsonTabNode, IJsonTabSetNode } from "flexlayout-react";
import type { ChartType } from "~/engine/types/chart-config.types";

 export const json1 = {
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
                          component: 'barChart',
                          config: {open: false}
                          // component: defaultItem || 'chart'
                      },
                      {
                          className:'item2',
                          type: "tab",
                          name: "Chart 2",
                          component: "barChart",
                          config: {open: false}
                          // component: defaultItem || 'chart'
                      }
                  ]
              },
              {
                  type: "tabset",
                  weight: 50,
                  children: [
                      {
                          className:'item3',
                          type: "tab",
                          name: "Chart 3",
                          component: "barChart",
                          config: {open: false}
                      }
                  ]
              }
          ]
      }
  };

export const json2 = {
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
                          name: "BarChart 1",
                          component: 'barChart',
                          config: {open: false}
                          // component: defaultItem || 'chart'
                      }
                  ]
              },
              {
                  type: "tabset",
                  weight: 50,
                  children: [
                      {
                          className:'item2',
                          type: "tab",
                          name: "LineChart 1",
                          component: "barChart",
                          config: {open: false}
                      }
                  ]
              },
              {
                  type: "tabset",
                  weight: 50,
                  children: [
                      {
                          className:'item3',
                          type: "tab",
                          name: "PieChart 1",
                          component: "barChart",
                          config: {open: false}
                      }
                  ]
              }
          ]
      }
  };

export const baseChildren: IJsonModel['layout']['children'] = [
    {
        type: "tabset",
        weight: 50,
        children: [{
            className: "item1",
            type: "tab",
            name: "BarChart 1",
            component: "bar",  
            id: 'item1',
            config: { 
                open: false,
                type: 'bar',
                dimensions: [],
                measures: [] 
            }
        }]
    }
];

export function createTabSetItem(
  id: string,
  name: string,
  type: ChartType
) {
  return {
    type: "tabset",
    weight: 50,
    children: [
      {
        type: "tab",
        id,
        name,
        component: type,
      }
    ]
  };
}

export function createLayoutJson(
    items: IJsonModel['layout']['children']
): IJsonModel {
    return {
    global: {},
    borders: [],
    layout: {
      type: "row",
      weight: 100,
      children: [
        ...items
      ]
    }
  };
};

export function getNextIndexByType(
  items: IJsonModel["layout"]["children"],
  type: ChartType
) {
  let max = 0;
  let totalCount = 0;

  items.forEach(tabset => {
    (tabset as IJsonTabSetNode).children?.forEach(tab => {
        totalCount++;
        if ((tab as IJsonTabNode).component === type) { 
            const match = tab.name?.match(/\d+$/);
            if (match) {
                max = Math.max(max, Number(match[0]));
            }
        }
    });
  });

  return {
    next: max + 1,
    totalCount
  }
}

export function getNextIndexFromLayout(
  layout: IJsonModel["layout"],
  type: ChartType
) {
  let max = 0;

  const walk = (node: any) => {
    if (!node) return;

    if (node.type === "tab" && node.component === type && node.id) {
      const match = node.id.match(/(\d+)$/);
      if (match) {
        max = Math.max(max, Number(match[1]));
      }
    }

    if (node.children) {
      node.children.forEach(walk);
    }
  };

  walk(layout);
  return max + 1;
}
