import express, { response } from 'express';
import axios from 'axios';
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

const app = express();
const port = 8080;

const __dirname = dirname(fileURLToPath(import.meta.url));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'))

app.get('/', async(req,res) =>{

    var randomNumber1 = Math.floor(Math.random()*6) + 1;
    //console.log(randomNumber1);



    try{
        const result = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/random.php');
        const drinkData = result.data.drinks[0];
        //console.log(drinkData);

        const ingredients = [];

        for (let i=0; i<=14; i++){
            const ingredient = drinkData['strIngredient'+i];
            if (ingredient){
                ingredients.push(ingredient);
            }
        }
        console.log(drinkData.strInstructions);
        // console.log(result.data);

        const randomImage1 = `/images/dice${randomNumber1}.png`;

        res.render("index.ejs", {
            cocktailName: drinkData.strDrink,
            cocktailInstructions: drinkData.strInstructions,
            ingredients: ingredients,
            cocktailImage: drinkData.strDrinkThumb,
            randomImage1: randomImage1,

        });
        
    } catch(error){
        console.log(error.response.data);
    }
} );



app.listen(port,()=>{
    console.log("Server started on the port: ", port);
})