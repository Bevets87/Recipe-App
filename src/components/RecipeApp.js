import React, { Component } from 'react';

import RecipeHeader from './RecipeHeader'
import EditRecipe from './EditRecipe'
import AddRecipe from './AddRecipe'

import App from 'grommet/components/App';
import Box from 'grommet/components/Box';
import Accordion from 'grommet/components/Accordion';
import AccordionPanel from 'grommet/components/AccordionPanel'
import Button from 'grommet/components/Button'
import AddIcon from 'grommet/components/icons/base/Add'

import _ from 'lodash'

import './RecipeApp.css'

class RecipeApp extends Component {
  constructor (props) {
    super (props)
    this.state = {
      recipes: [
        {
          title: 'Spaghetti and Meatballs',
          ingredients: 'pasta, tomato sauce, meatballs'
        },
        {
          title: 'Apple Pie',
          ingredients: 'apples, pie crust, sugar, cinnammon'
        }
      ],
      selectedRecipe: null,
      active: false,
      newRecipe: {
        title: null,
        ingredients: null
      }
    }
    this.selectRecipe = this.selectRecipe.bind(this)
    this.submitEdit = this.submitEdit.bind(this)
    this.cancelEdit = this.cancelEdit.bind(this)
    this.onEditTitle = this.onEditTitle.bind(this)
    this.onEditIngredients = this.onEditIngredients.bind(this)
    this.deleteRecipe = this.deleteRecipe.bind(this)
    this.handleAddRecipeModal = this.handleAddRecipeModal.bind(this)
    this.cancelAdd = this.cancelAdd.bind(this)
    this.submitAdd = this.submitAdd.bind(this)
    this.onAddTitle = this.onAddTitle.bind(this)
    this.onAddIngredients = this.onAddIngredients.bind(this)
  }
  componentDidMount () {
    var userRecipes = JSON.parse(localStorage.getItem('_user_recipes'))
    if (userRecipes) {
      this.setState({
        recipes: userRecipes
      })
    }
  }
  componentWillUpdate (nextProps, nextState) {
    var noChangesToRecipes = _.isEqual(this.state.recipes, nextState.recipes)
    if (!noChangesToRecipes) {
      localStorage.setItem('_user_recipes', JSON.stringify(nextState.recipes))
    }
  }
  onEditTitle (event) {
    var selectedRecipe = this.state.selectedRecipe
    selectedRecipe.title = event.target.value
    this.setState({
      selectedRecipe: selectedRecipe
    })
  }
  onEditIngredients (event) {
    var selectedRecipe = this.state.selectedRecipe
    selectedRecipe.ingredients = event.target.value
    this.setState({
      selectedRecipe: selectedRecipe
    })
  }
  selectRecipe (e) {
    var selectedRecipe = this.state.recipes.filter(recipe => recipe.title === e.value)
    this.setState({
      selectedRecipe: selectedRecipe[0]
    })
  }
  submitEdit () {
    var selectedRecipeIndex = _.findIndex(this.state.recipes, {title: this.state.selectedRecipe.title})
    var recipes = this.state.recipes
    recipes[selectedRecipeIndex] = this.state.selectedRecipe
    this.setState({
      recipes: recipes,
      selectedRecipe: null
    })
  }
  cancelEdit () {
    this.setState({
      selectedRecipe: null
    })
  }
  deleteRecipe () {
    var selectedRecipeIndex = _.findIndex(this.state.recipes, {title: this.state.selectedRecipe.title})
    this.state.recipes.splice(selectedRecipeIndex, 1)
    this.setState({
      recipes: this.state.recipes,
      selectedRecipe: null
    })
  }
  handleAddRecipeModal () {
    this.setState({
      active: true
    })
  }
  cancelAdd () {
    this.setState({
      active: false
    })
  }
  submitAdd () {
    var recipes = this.state.recipes.slice()
    recipes.push(this.state.newRecipe)
    this.setState({
      recipes: recipes,
      newRecipe: {
        title: null,
        ingredients: null
      },
      active: false
    })
  }
  onAddTitle (event) {
    var newRecipe = this.state.newRecipe
    newRecipe.title = event.target.value
    this.setState({
      newRecipe: newRecipe
    })
  }
  onAddIngredients (event) {
    var newRecipe = this.state.newRecipe
    newRecipe.ingredients = event.target.value
    this.setState({
      newRecipe: newRecipe
    })
  }
  render() {
    var { recipes, selectedRecipe, active } = this.state
    return (
      <App id='app' centered={false}>
        <Box>
          <RecipeHeader recipes={recipes} selectRecipe={this.selectRecipe} />
          <Accordion animate={true}>
          {recipes.map(recipe => {
            return (
              <AccordionPanel style={{'color':'white'}} key={recipe.title} id='accordion-panel' heading={recipe.title}>
                <p id='recipe-ingredients'>
                  {recipe.ingredients}
                </p>
              </AccordionPanel>
            )
          })}
          </Accordion>
          <Box direction='row' full='horizontal' justify='end' responsive={false}>
            <Button icon={<AddIcon />}
            style={{
              'backgroundColor':'rgba(240,201,84,0.4)',
              'marginTop':'20px',
              'marginRight':'20px'
            }}
            label='add recipe'
            onClick={this.handleAddRecipeModal}
            primary={true} />
          </Box>
        </Box>
        <EditRecipe
        recipe={selectedRecipe}
        submitEdit={this.submitEdit}
        cancelEdit={this.cancelEdit}
        deleteRecipe={this.deleteRecipe}
        onEditTitle={this.onEditTitle}
        onEditIngredients={this.onEditIngredients}
        />
        <AddRecipe
        active={active}
        submitAdd={this.submitAdd}
        cancelAdd={this.cancelAdd}
        onAddTitle={this.onAddTitle}
        onAddIngredients={this.onAddIngredients}
        />
      </App>
    )
  }
}

export default RecipeApp;
