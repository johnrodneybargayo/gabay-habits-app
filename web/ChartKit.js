// Web polyfill for react-native-chart-kit
// This provides basic chart functionality using HTML5 Canvas for web

import React from 'react';

const LineChart = ({ data, width, height, chartConfig, style, ...props }) => {
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !data || !data.datasets) return;

    const ctx = canvas.getContext('2d');
    const { datasets, labels } = data;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Set background
    ctx.fillStyle = chartConfig?.backgroundColor || '#ffffff';
    ctx.fillRect(0, 0, width, height);
    
    if (datasets && datasets.length > 0) {
      const dataset = datasets[0];
      const values = dataset.data || [];
      
      if (values.length > 0) {
        const padding = 40;
        const chartWidth = width - (padding * 2);
        const chartHeight = height - (padding * 2);
        
        const maxValue = Math.max(...values);
        const minValue = Math.min(...values);
        const valueRange = maxValue - minValue || 1;
        
        // Draw grid lines
        ctx.strokeStyle = chartConfig?.color ? chartConfig.color(0.2) : '#e0e0e0';
        ctx.lineWidth = 1;
        
        // Horizontal grid lines
        for (let i = 0; i <= 5; i++) {
          const y = padding + (chartHeight / 5) * i;
          ctx.beginPath();
          ctx.moveTo(padding, y);
          ctx.lineTo(width - padding, y);
          ctx.stroke();
        }
        
        // Draw line
        ctx.strokeStyle = dataset.color ? dataset.color(1) : chartConfig?.color ? chartConfig.color(1) : '#007AFF';
        ctx.lineWidth = 3;
        ctx.beginPath();
        
        values.forEach((value, index) => {
          const x = padding + (chartWidth / (values.length - 1)) * index;
          const y = padding + chartHeight - ((value - minValue) / valueRange) * chartHeight;
          
          if (index === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        });
        
        ctx.stroke();
        
        // Draw points
        ctx.fillStyle = dataset.color ? dataset.color(1) : chartConfig?.color ? chartConfig.color(1) : '#007AFF';
        values.forEach((value, index) => {
          const x = padding + (chartWidth / (values.length - 1)) * index;
          const y = padding + chartHeight - ((value - minValue) / valueRange) * chartHeight;
          
          ctx.beginPath();
          ctx.arc(x, y, 4, 0, 2 * Math.PI);
          ctx.fill();
        });
      }
    }
  }, [data, width, height, chartConfig]);

  return React.createElement('canvas', {
    ref: canvasRef,
    width: width,
    height: height,
    style: {
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
      ...style
    },
    ...props
  });
};

const BarChart = ({ data, width, height, chartConfig, style, ...props }) => {
  return React.createElement('div', {
    style: {
      width: width,
      height: height,
      backgroundColor: chartConfig?.backgroundColor || '#f5f5f5',
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      ...style
    },
    ...props
  }, 'Bar Chart (Web Fallback)');
};

const PieChart = ({ data, width, height, chartConfig, style, ...props }) => {
  return React.createElement('div', {
    style: {
      width: width,
      height: height,
      backgroundColor: chartConfig?.backgroundColor || '#f5f5f5',
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      ...style
    },
    ...props
  }, 'Pie Chart (Web Fallback)');
};

export {
  LineChart,
  BarChart,
  PieChart
};

export default {
  LineChart,
  BarChart,
  PieChart
};