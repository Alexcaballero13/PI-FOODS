import { Link } from "react-router-dom"
import styles from './Recipes.module.css'

const Recipes = ({id, name, image, Diets})=>{
return (
    <div className={styles.onerecipe}>
    <Link to={`/RecipeDetail/${id}`}>
        <img src={image} alt={name} className={styles.image1}/>
        </Link>
        <div className={styles.firstDiv}>
            <h2 className={styles.secondh2}>{name}</h2>
                 {Diets.map(diet=>{
                return <h3 className={styles.thirdh2}>{diet}</h3>
            
            })}
        </div>
    </div>
)
}

export default Recipes