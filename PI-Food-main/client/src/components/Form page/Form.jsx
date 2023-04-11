import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { sendInformation } from '../../redux/actions'
import styles from './Form.module.css'

const validate = ({name, summary, health_score})=>{
const errors ={}

if (name.length > 40) errors.name = 'You exceeded Max. Number of characters' 
if (summary.length > 150) errors.summary = 'You exceeded Max. Number of characters'
if (Number(health_score) > 100 || Number(health_score) < 0) errors.health_score = 'Health Score must be on 0-100 range' 

return errors
}

const Form = () =>{

    const dispatch = useDispatch();
    let message = useSelector(state => state.message)

    const [form, setForm] = useState({
        name: '',
        summary: '',
        health_score: '',
        step_by_step: '',
        image: '',
        diets: []
    })

    const [errors, setErrors] = useState({
        name: '',
        summary: '',
        health_score: '',
    })
    
    const handleInputForm = (event) =>{
        const name = event.target.name
        const value = event.target.value
        message = ''
        
        setForm({
            ...form,
            [name]: value
        })

        setErrors(validate({
            ...form,
            [name]: value
        }))
    }

    const handledietInput = (event) =>{
        const name = event.target.name
        const value = event.target.value
        const checked = event.target.checked

        if(checked === true){
        setForm({
            ...form,
            [name]: [...form.diets, Number(value)]
        })}

        if(checked === false){
            setForm({
                ...form, 
            [name]: form.diets.filter(obj => obj !== Number(value))
        })}
        
    } 

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(sendInformation(form.name, form.image, form.summary, Number(form.health_score), [form.step_by_step], form.diets))
        setForm({
            name: '',
            summary: '',
            health_score: '',
            step_by_step: '',
            image: '',
            diets: []
        })
    }

    return(
        <div className={styles.Form}>
            <form className={styles.Form1} onSubmit={handleSubmit}>
                <h1 className={styles.titlenewrecipe}>ADD A NEW RECIPE</h1>
                    <div className={styles.inputlabel}> 
                        <label htmlFor="name" className={styles.totalLabels}>Name: </label>
                        <input type="text" name="name" value={form.name} onChange={handleInputForm} className={styles.inputsearch}/> {errors.name? <p>{errors.name}</p>:""}
                    </div>

                    <div className={styles.inputlabel}> 
                        <label htmlFor="summary" className={styles.totalLabels}>Summary: </label>
                        <input type="text" name="summary" value={form.summary} onChange={handleInputForm} className={styles.inputsearch1}/>  {errors.summary? <p>{errors.summary}</p>:""}
                    </div>

                    <div className={styles.inputlabel}>
                        <label htmlFor="health_score" className={styles.totalLabels}>Health Score: </label>
                        <input type="number" name="health_score" value={form.health_score} onChange={handleInputForm} className={styles.inputsearch}/> {errors.health_score? <p>{errors.health_score}</p>:""}
                    </div>

                    <div className={styles.inputlabel}>
                        <label htmlFor="step_by_step" className={styles.totalLabels}>Step by step: </label>
                        <input type="text" name="step_by_step" value={form.step_by_step} onChange={handleInputForm} className={styles.inputsearch1}/>
                    </div>

                    <div className={styles.inputlabel}>
                        <label htmlFor="image" className={styles.totalLabels}>Image: </label>
                        <input type="text" name="image" value={form.image} onChange={handleInputForm} className={styles.inputsearch}/>
                    </div>

                    <div className={styles.inputlabel1}>
                        <label htmlFor="diets" className={styles.totalLabels}>Diets: </label>
                        <div className={styles.inputlabel2}>
                            <input type="checkbox" name="diets" value="1" onChange={handledietInput}/> 
                            <h1 className={styles.h1form}>gluten free</h1>
                        </div>
                        <div className={styles.inputlabel2}>
                            <input type="checkbox" name="diets" value="2" onChange={handledietInput}/> 
                            <h1 className={styles.h1form}>dairy free</h1>
                        </div>
                        <div className={styles.inputlabel2}>
                            <input type="checkbox" name="diets" value="3" onChange={handledietInput}/> 
                            <h1 className={styles.h1form}>lacto ovo vegetarian</h1>
                        </div>
                        <div className={styles.inputlabel2}>
                            <input type="checkbox" name="diets" value="4" onChange={handledietInput}/> 
                            <h1 className={styles.h1form}>vegan</h1>
                        </div>
                        <div className={styles.inputlabel2}>
                            <input type="checkbox" name="diets" value="5" onChange={handledietInput}/> 
                            <h1 className={styles.h1form}>paleolithic</h1>
                        </div>
                        <div className={styles.inputlabel2}>
                            <input type="checkbox" name="diets" value="6" onChange={handledietInput}/> 
                            <h1 className={styles.h1form}>primal</h1>
                        </div>
                        <div className={styles.inputlabel2}>
                            <input type="checkbox" name="diets" value="7" onChange={handledietInput}/> 
                            <h1 className={styles.h1form}>whole 30</h1>
                        </div>
                    </div>
                    <div className={styles.buttonanddmessage}>
                        <button type="submit" className={styles.Buttontoforms} disabled={errors.name||errors.health_score||errors.summary||!form.name||!form.image||form.diets.length===0||!form.health_score||!form.step_by_step||!form.summary}>Create Recipe</button>
                        <h3 className={styles.onlymessage}>{message}</h3>
                    </div>

            </form>
        </div>
    )
}
export default Form