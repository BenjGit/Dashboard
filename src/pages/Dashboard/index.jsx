import NutritionBox from "../../components/NutritionBox/Index";
import { BarChart, Label, CartesianGrid, 
  XAxis, YAxis, Tooltip, Legend , Bar, RadarChart, PolarGrid, 
  PolarAngleAxis, Radar,LineChart, Line,
  Pie, PieChart, Text } from 'recharts';
import fire from '../../assets/fire.svg';
import burger from '../../assets/burger.svg';
import chicken from '../../assets/chicken.svg';
import apple from '../../assets/apple.svg';
import { useState } from "react";
import './style.css'
import UserModel from "../../data/userModel";

function Dashboard() {
  const { data, toggleDataSource } = UserModel();
  
  if (!data.user) {
    return <div>No user data available.</div>;
  }

  
  return (
    <div>
      <button onClick={() => toggleDataSource('mocked' , 12)}>Données Mockées</button>
    <button onClick={() => toggleDataSource('api' , 12)}>Données de l'API</button>
      <span className="welcome-txt">Bonjour <span className="firstname">{data.user}</span></span>
      <p className="objectif-txt">Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
      <div className="main-content">
        <div className="diagrams-container">
          <div className="dayli-activity">
            <h1 className="activity-title">Activité quotidienne</h1>
            <BarChart  backgroundColor="#FBFBFB" width={795} height={280} data={data.activity.sessions}>
              <CartesianGrid strokeDasharray="3 3" vertical={false}/>
              <XAxis tickFormatter={(value) => value + 1  }/>
              <YAxis hide={true} yAxisId="left" orientation="left" />
              <YAxis ticks={[74, 75, 76, 77, 78, 79, 80 ,81 ,82 ,83]}  domain={[75, 83]}yAxisId="right" orientation="right" />
              <Legend iconType="circle" iconSize={8} formatter={(value, entry, index) => <span className="legend-color">{value}</span>} 
              verticalAlign="top" align="right" wrapperStyle={{ position: 'absolute', top: '-17px', fontSize: '14px'}} />
              <Tooltip />
              <Bar yAxisId="right" name="Poids (kg)" dataKey="kilogram" fill="#282D30" barSize={10} radius={[5, 5, 0, 0]} />
              <Bar  yAxisId="left" name="Calories brûlées (kCal)" dataKey="calories" fill="#E60000" barSize={10} radius={[5, 5, 0, 0]} />
            </BarChart>
          </div>
          <div className="d-container">
            <div className="line-container">
              <LineChart
                width={258} height={263}
                data={data.average_sessions.sessions}
                margin={{
                  right:0,
                  left: 5,
                }}
              >
                <XAxis axisLine={false}  tickLine={false} dataKey="day"/>
                <Tooltip />   
                <Label className='line-session-label' value="TEST"  position="insideTopLeft"/> 
                <Line dot={false} className="gradientLine" type="monotone" dataKey={"sessionLength"} strokeWidth={3} stroke="url(#gradientColor)"  />
                <defs>
                <linearGradient id="gradientColor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="95%" stopColor="#D8D8D8" stopOpacity={1} />
                  <stop offset="5%" stopColor="#D8D8D8" stopOpacity={1} />
                </linearGradient>
              </defs>
              </LineChart>
            </div>
            <div className="radar-container">
              <RadarChart width={258} height={263} cx="50%" cy="50%" outerRadius="80%" data={data.performance.data}>
                <PolarGrid />
                <PolarAngleAxis dataKey="kind" />
                <Radar  className="" dataKey="value"  fill="#FF0000" fillOpacity={0.4} />
              </RadarChart>
            </div>
            <div className="pie-container">
              <span className="circle"></span>
              <PieChart width={258} height={263}>
                <Pie data={data} dataKey="value" cx="50%" cy="50%" innerRadius={70} labelLine={false} outerRadius={90} startAngle={90} endAngle={90 + 360 * data.user.todayScore} fill="#FF0101" label >
                <Label className='score' value={`${(data.user.todayScore * 100).toFixed(0)}%`} position="center" dy={0}/>
                <Label value="de votre" position="center" dy={20} />
                <Label value="objectif" position="center" dy={40} />
                </Pie>
              </PieChart>
            </div>
          </div>
        </div>     
        <div className="nutrition-box-container">
          <NutritionBox
          icon={fire}
          weight={data.user.keyData.calorieCount + 'kCal'}
          nutrients='Calories'
          />
          <NutritionBox
          icon={chicken}
          weight={data.user.keyData.proteinCount + 'g'}
          nutrients='Proteines'
          iconContainerStyle= {{
            backgroundColor:'#E9F4FB',
          }}
          />
          <NutritionBox
          icon={apple}
          weight={data.user.keyData.carbohydrateCount + 'g'}
          nutrients='Glucides'
          iconContainerStyle= {{
            backgroundColor:'#FBF6E5',
          }}
          />
          <NutritionBox
          icon={burger}
          weight={data.user.keyData.lipidCount + 'g'}
          nutrients='Lipides'
          iconContainerStyle= {{
            backgroundColor:'#FBEAEF',
          }}
          />
        </div>
      </div>
    </div>
  );
}
export default Dashboard