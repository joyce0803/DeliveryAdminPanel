import "./chart.scss"

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


const data = [
    
    {name: "Monday", Total:1200},
    {name:"Tuesday", Total:2100},
    {name:"Wednesday", Total:800},
    {name:"Thursday", Total:1600},
    {name:"Friday", Total:900},
    {name:"Saturday", Total:1700},
    {name:"Sunday",Total:1500}
  ];
  
  

const Chart = () => {
  return (
    <div className="chart">
        <div className="title">Last week (Revenue)</div>
      <ResponsiveContainer width="100%" aspect={2/1}>
      <AreaChart width={730} height={250} data={data}
  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
  <defs>
    
    <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
      <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
    </linearGradient>
  </defs>
  <XAxis dataKey="name" stroke="gray"/>
  {/* <YAxis /> */}
  <CartesianGrid strokeDasharray="3 3" className=""/>
  <Tooltip />
  
  <Area type="monotone" dataKey="Total" stroke="#82ca9d" fillOpacity={1} fill="url(#total)" />
</AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Chart
