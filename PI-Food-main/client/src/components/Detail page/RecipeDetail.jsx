import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getRecipeDetail, cleanRecipeDetail } from "../../redux/actions"
import styles from './Detail.module.css'

const RecipeDetail = () => {

    const { id } = useParams();
    const dispatch = useDispatch();
    const { image, name, summary, health_score, step_by_step, diets } = useSelector(state => state.recipeDetail)

    useEffect(() =>{
        dispatch(getRecipeDetail(id))

        return () => dispatch(cleanRecipeDetail())
    }, [dispatch, id])
    
return (
    <div key={id} className={styles.Detail}>
        <div className={styles.Detail1}>
            <img src={image} alt={name} className={styles.imageDetail}/>
            <div className={styles.Detail2}>
                <h2>Name: {name}</h2>
                <h3>Id: {id}</h3>
                <div className={styles.Detail3}>
                    <p>Summary: {summary}</p>
                </div>
        <h2>Health Score: {health_score}</h2>
        <div className={styles.Detail3}>
            <ol><h2>Step by Step: </h2>{step_by_step?.map(step=>{
                return <li className={styles.Detail6}>{step}</li>
            })}</ol>
        </div>
        <div className={styles.Detail4}>
            <h2>Diets: </h2> {diets?.map(diet=>{
                return <p className={styles.Detail5}>{diet}</p>
            })}
        </div>
        </div>
    </div>
    </div>
)
}

export default RecipeDetail