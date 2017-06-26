import React, { Component } from 'react'

import Form from 'grommet/components/Form'
import Header from 'grommet/components/Header'
import FormFields from 'grommet/components/FormFields'
import TextInput from 'grommet/components/TextInput'
import FormField from 'grommet/components/FormField'
import Button from 'grommet/components/Button'
import Footer from 'grommet/components/Footer'
import CloseIcon from 'grommet/components/icons/base/Close'
import CafeteriaIcon from 'grommet/components/icons/base/Cafeteria'


import './EditRecipe.css'

class EditRecipe extends Component {
  render () {
    if (this.props.recipe) {
      var { recipe, submitEdit, cancelEdit, onEditTitle, onEditIngredients, deleteRecipe } = this.props
      return (
        <Form id='edit-form' style={{
          'opacity': '1',
          'zIndex':'100'
        }} pad='small'>
          <Header  direction='row' full='horizontal' justify='between'>
            <div>
            <CafeteriaIcon size='medium' />
            <span style={{'fontWeight':'bold', 'color':'white','fontSize':'30px'}}>
              Edit
            </span>
            </div>
            <Button icon={<CloseIcon size='medium' />} onClick={cancelEdit} />
          </Header>
          <FormFields >
            <FormField style={{'margin':'10px auto', 'width':'80%'}} label='title'>
              <TextInput id='text-input' onDOMChange={onEditTitle} defaultValue={recipe.title} />
            </FormField>
            <FormField style={{'margin':'10px auto', 'width':'80%'}} label='ingredients'>
              <TextInput id='text-input' onDOMChange={onEditIngredients} defaultValue={recipe.ingredients} />
            </FormField>
          </FormFields>
          <Footer id='footer' direction='row' full='horizontal' justify='end'>
            <div id='button-container'>
              <Button
              fill={true}
              label='delete recipe'
              type='submit'
              critical={true}
              onClick={deleteRecipe}
              style={{'marginTop':'10px'}}/>
              <Button
              fill={true}
              label='submit recipe'
              type='submit'
              primary={true}
              onClick={submitEdit}
              style={{'marginTop':'10px'}} />
            </div>
          </Footer>
        </Form>
      )
    } else {
      return (
        <Form id='form' style={{
          'opacity': '0',
          'zIndex': '-100'
        }} pad='small'>
        </Form>
      )
    }
  }
}

export default EditRecipe
