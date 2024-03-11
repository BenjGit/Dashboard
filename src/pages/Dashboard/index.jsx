import NutritionBox from "../../components/NutritionBox/Index";
import { BarChart, Label, CartesianGrid, 
  XAxis, YAxis, Tooltip, Legend , Bar, RadarChart, PolarGrid, 
  PolarAngleAxis, Radar,LineChart, Line,
  Pie, PieChart} from 'recharts';
import fire from '../../assets/fire.svg';
import burger from '../../assets/burger.svg';
import chicken from '../../assets/chicken.svg';
import apple from '../../assets/apple.svg';
import { useState, useEffect } from "react";
import './style.css'
import useUserData from "../../useUserData";

function Dashboard() {
  const { userData, changeUser, changeDataSource } = useUserData();
  const [loading, setLoading] = useState(true); // État de chargement initial
  const [mousePosition, setMousePosition] = useState({ x: null});
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    console.log(userData)
    if (userData) {
      setLoading(false); 
    }
  }, [userData]);

  if (loading) {
    return <div>Loading...</div>; 
  }

  const handleMouseMove = (e) => {
    if (e) {
      setMousePosition({ x: e.chartX});
      setShowOverlay(true);
    }
  };

  const handleMouseLeave = () => {
    setShowOverlay(false);
  };

  const handleToggleDataSource = (userId) => {
    changeUser(userId); // Changer l'utilisateur en utilisant la fonction changeUser
  };

  const handleDataSourceToggle = () => {
    if (userData.source === 'mocked') {
      changeDataSource('api');
    } else {
      changeDataSource('mocked');
    }
  };

  const [minKg, maxKg] = userData.sessions.reduce((acc, session) => {
    acc[0] = Math.min(acc[0], session.kilogram);
    acc[1] = Math.max(acc[1], session.kilogram);
    return acc;
  }, [Infinity, -Infinity]);

  return (
    <div>
      <div className="buttons">
        <select onChange={(e) => handleToggleDataSource(parseInt(e.target.value))}>
          <option value="12">Karl</option>
          <option value="18">Cecilia</option>
        </select>
        <button className="switch" onClick={handleDataSourceToggle}>
          <input type="checkbox" checked={userData.source === 'api'} readOnly />
          <span className="slider round"></span>
          <label htmlFor="dataSourceToggle">
            {userData.source === 'mocked' ? 'Données Mockées' : 'Données de l\'API'}
          </label>
        </button>
      </div>
      <span className="welcome-txt">Bonjour <span className="firstname">{userData.userInfos.firstName}</span></span>
      <p className="objectif-txt">Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
      <div className="main-content">
        <div className="diagrams-container">
          <div className="dayli-activity">
            <h1 className="activity-title">Activité quotidienne</h1>
            <BarChart  backgroundColor="#FBFBFB" width={795} height={265} data={userData.sessions}>
              <CartesianGrid strokeDasharray="3 3" vertical={false}/>
              <XAxis tickFormatter={(value) => value + 1  }/>
              <YAxis hide={true} yAxisId="left" orientation="left" />
              <YAxis   domain={[minKg-2, maxKg+2]} yAxisId="right" orientation="right" />
              <Legend iconType="circle" iconSize={8} formatter={(value) => <span className="legend-color">{value}</span>} 
              verticalAlign="top" align="right" wrapperStyle={{ position: 'absolute', top: '-17px', fontSize: '14px'}} />
              <Tooltip formatter={(value, name) => {
                return [`${name === 'Poids (kg)' ? value + ' kg' : value + ' kcal'}`];
              }} 
              labelStyle={{ display: 'none'}} itemStyle={{ color: '#FFFFFF', fontSize: '14px' }} // Couleur du texte
              contentStyle={{ backgroundColor: '#E60000',border: 'none' }} /* Couleur du fond */
              />
              <Bar yAxisId="right" name="Poids (kg)" dataKey="kilogram" fill="#282D30" barSize={10} radius={[5, 5, 0, 0]} />
              <Bar  yAxisId="left" name="Calories brûlées (kCal)" dataKey="calories" fill="#E60000" barSize={10} radius={[5, 5, 0, 0]} />
            </BarChart>
          </div>
          <div className="d-container">
            <div className="line-container">
            <h2 className="chart-title">Durée moyenne des <br/>sessions</h2>
              <LineChart
                width={258} height={213}
                data={userData.averageSessions}
                margin={{
                  left:15,
                  right:15,
                }}
                onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}> 
                <XAxis axisLine={false}  tickLine={false} tick={{ fill: '#FFFFFF', opacity: '0.5'  }}  tickFormatter={(value, index) => {
                  const daysOfWeek = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
                  return daysOfWeek[index];
                }}/>
                <Tooltip 
                  formatter={(value) => [`${value} min`]} labelStyle={{ display: 'none'}} itemStyle={{fontSize: '14px'}} 
                  contentStyle={{border: 'none'}} wrapperStyle={{ top: -50, left: 5 }}
                />   
                <Line dot={false} className="gradientLine" type="monotone" dataKey={"sessionLength"} strokeWidth={3} stroke="url(#gradientColor)"  />
                <defs>
                <linearGradient id="gradientColor" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="5%" stopColor="#FFFFFF" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#FFFFFF" stopOpacity={1} /> 
                </linearGradient>
              </defs>
              </LineChart>
              {showOverlay && (
              <div className="overlay" style={{ position: 'absolute', right:0, top: 0, width: `calc(100% - ${mousePosition.x}px - 5px)`, height: '100%' }}/>
            )}
            </div>
            <div className="radar-container">
              <RadarChart width={350} height={263} outerRadius="80%" data={userData.performance.data} >
                <PolarGrid radialLines={false} stroke="#FFFFFF"/>
                <PolarAngleAxis dataKey="kind" tickFormatter={value => userData.performance.kind[value]} tick={{width:300, height:350, fill: '#FFFFFF'}}/>
                <Radar  className="" dataKey="value"  fill="#FF0000" fillOpacity={0.4}/>
              </RadarChart>
            </div>
            <div className="pie-container">
              <span className="circle"></span>
              <PieChart width={258} height={263}>
                <Pie  data={[{ todayScore: userData.todayScore }]}dataKey="todayScore" cx="50%" cy="50%" innerRadius={75} labelLine={false} startAngle={90} outerRadius={88} cornerRadius={10} endAngle={90 + 360 * userData.todayScore} fill="#FF0101" >
                <Label className='score' value={`${(userData.todayScore * 100).toFixed(0)}%`} position="center" dy={-20}/>
                <Label value="de votre" position="center" dy={10} />
                <Label value="objectif" position="center" dy={30} />
                <Label className="labelScore" value="Score" fill="#00000" dy={-30} dx={-30}/>
                </Pie>
              </PieChart>
            </div>
          </div>
        </div>     
        <div className="nutrition-box-container">
          <NutritionBox
          icon={fire}
          weight={userData.keyData.calorieCount + 'kCal'}
          nutrients='Calories'
          />
          <NutritionBox
          icon={chicken}
          weight={userData.keyData.proteinCount + 'g'}
          nutrients='Proteines'
          iconContainerStyle= {{
            backgroundColor:'#E9F4FB',
          }}
          />
          <NutritionBox
          icon={apple}
          weight={userData.keyData.carbohydrateCount + 'g'}
          nutrients='Glucides'
          iconContainerStyle= {{
            backgroundColor:'#FBF6E5',
          }}
          />
          <NutritionBox
          icon={burger}
          weight={userData.keyData.lipidCount + 'g'}
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