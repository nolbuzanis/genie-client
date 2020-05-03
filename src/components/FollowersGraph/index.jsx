import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import { linearGradientDef } from '@nivo/core';

const FollowersGraph = ({ data }) => {
  let max;
  if (data[0].data) {
    max = Math.max.apply(Math, data[0].data.map(function (o) { return o.y; })) || 1;
  }

  return <ResponsiveLine
    theme={{
      fontFamily: "Montserrat",
      textColor: '#333333',
      grid: {
        line: {
          stroke: '#eeeeee',
          strokeWidth: 1,
        },
      },
      axis: {
        domain: {
          line: {
            stroke: 'transparent',
            strokeWidth: 1,
          },
        },
        ticks: {
          line: {
            stroke: '#cccccc',
            strokeWidth: 1,
          },
          text: {},
        },
      },
    }}
    curve='cardinal'
    data={data}
    margin={{ top: 50, right: 25, bottom: 30, left: 40 }}
    xScale={{ type: 'point' }}
    //yScale={{ type: 'linear', min: '0', max: 'auto', stacked: false, reverse: false }}
    axisTop={null}
    axisRight={null}
    axisBottom={{
      orient: 'bottom',
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      //legend: 'transportation',
      //legendOffset: 36,
      //legendPosition: 'middle'
    }}
    defs={[
      linearGradientDef('gradientA', [
        { offset: 0, color: 'inherit' },
        { offset: 0, color: 'inherit', opacity: 0 },
      ]),
    ]}
    fill={[
      { match: '*', id: 'gradientA' }
    ]}
    axisLeft={{
      orient: 'left',
      tickSize: 5,
      //tickValues: d => { d.},
      tickPadding: 10,
      tickRotation: 0,
      tickValues: max < 5 ? max : 5
      //legend: 'followers',
      //legendOffset: -40,
      //legendPosition: 'middle'
    }}
    colors={d => d.color}
    //colors={{ scheme: 'nivo' }}
    pointSize={10}
    pointColor={d => d.color}
    pointBorderWidth={0}
    pointBorderColor='rgba(69,104,220,0.7)'
    pointLabel="y"
    pointLabelYOffset={- 12}
    enableArea={false}
    enableGridX={true}
    areaOpacity={1}
    useMesh={true}
    legends={
      [
        {
          anchor: 'top-right',
          direction: 'column',
          justify: false,
          translateX: 0,
          translateY: -40,
          itemsSpacing: 0,
          itemDirection: 'left-to-right',
          itemWidth: 80,
          itemHeight: 15,
          itemOpacity: 0.75,
          symbolSize: 9,
          symbolShape: 'circle',
          symbolBorderColor: 'rgba(0, 0, 0, .5)',
          effects: [
            {
              on: 'hover',
              style: {
                itemBackground: 'rgba(0, 0, 0, .03)',
                itemOpacity: 1
              }
            }
          ]
        }
      ]}
    enableCrosshair={false}
    xPadding={0.5}
    xOuterPadding={0.5}
    interpolation="smooth"
  />
};

export default FollowersGraph;