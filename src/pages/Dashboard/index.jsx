import { getUserAccount } from "../../api";
import NutritionBox from "../../components/NutritionBox/Index";
import { data } from "../../data/data";
import fire from '../../assets/fire.svg';
import burger from '../../assets/burger.svg';
import chicken from '../../assets/chicken.svg';
import apple from '../../assets/apple.svg';
import './style.css'

function Dashboard() {
  //   const { userId } = useParams();
  //   getUserAccount(userId)

  //   useEffect(() => {
  //     const fetchUserFirstName = async () => {
  //       try {
  //           const response = await getUserAccount(userId);
  //           const firstName = response.data.firstName;
  //           setUserFirstName(firstName);
  //       } catch (error) {
  //           console.error('Error fetching user data:', error);
  //       }
  //   };

  //   fetchUserFirstName();
  // }, [userId]); 


  return (
    <div>
      <span className="welcome-txt">Bonjour <span className="firstname">{data.user[0].userInfos.firstName}</span></span>
      <p className="objectif-txt">Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
      <div className="nutrition-box-container">
        <NutritionBox
        icon={fire}
        weight={data.user[0].keyData.calorieCount + 'kCal'}
        nutrients='Calories'
        />
        <NutritionBox
        icon={chicken}
        weight={data.user[0].keyData.proteinCount + 'g'}
        nutrients='Proteines'
        iconContainerStyle= {{
          backgroundColor:'#E9F4FB',
        }}
  
        />
        <NutritionBox
        icon={apple}
        weight={data.user[0].keyData.carbohydrateCount + 'g'}
        nutrients='Glucides'
        iconContainerStyle= {{
          backgroundColor:'#FBF6E5',
        }}
        />
        <NutritionBox
        icon={burger}
        weight={data.user[0].keyData.lipidCount + 'g'}
        nutrients='Lipides'
        iconContainerStyle= {{
          backgroundColor:'#FBEAEF',
        }}
        />
      </div>
    </div>
  );
}

export default Dashboard;
