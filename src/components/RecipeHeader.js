import React, { Component } from 'react'

import Header from 'grommet/components/Header'
import CafeteriaIcon from 'grommet/components/icons/base/Cafeteria'
import Box from 'grommet/components/Box'
import Select from 'grommet/components/Select';

import './RecipeHeader.css'

class RecipeHeader extends Component {
  constructor (props) {
    super(props)
    this.state = {
      recipeTitles: []
    }
  }
  componentDidMount () {
    var { recipes } = this.props
    var recipeTitles = []
    recipes.forEach(recipe => {
      recipeTitles.push(recipe.title)
    })
    this.setState({
      recipeTitles: recipeTitles
    })
  }
  componentWillReceiveProps (nextProps) {
    var { recipes } = nextProps
    var recipeTitles = []
    recipes.forEach(recipe => {
      recipeTitles.push(recipe.title)
    })
    this.setState({
      recipeTitles: recipeTitles
    })
  }
  render () {
    let { recipeTitles} = this.state
    let { selectRecipe } = this.props
    return (
      <Header id='recipe-header' fixed={true} size='small'>
        <Box full='horizontal' justify='center' direction='column'>
          <div id='recipe-title-container'>
            <CafeteriaIcon size='large' />
            <span id='recipe-title'>Recipe App</span>
          </div>
          <Select id='select-box' placeHolder='edit recipe'
            value={undefined}
            options={recipeTitles}
            onChange={selectRecipe}
          />
        </Box>
      </Header>
    )
  }
}

export default RecipeHeader
