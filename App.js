import React, { useState } from 'react';
import { Text, TextInput, View, Button, FlatList } from 'react-native';
import styled from 'styled-components/native';

const Expression = styled.TextInput`
  border-style: solid;
  border-color: blue;
  border-width: 2px;
`;

const ResultButton = styled.Button`
  border-color: red;
`;

const Item = ({ title }) => (
  <View>
    <Text style={{color: 'red'}}>{title}</Text>
  </View>
);

const PizzaTranslator = () => {
  const [result, set_result] = useState('');
  const [expression, set_expression] = useState('');
  const [history, set_history] = useState([])
  const [search_history, set_search_history] = useState([...history])

  const renderItem = ({ item }) => (
    <Item title={item.expression + '=' + item.value} />
  );

  return (
    <View style={{padding: 10}}>
      <Expression
        style={{height: 40}}
        placeholder="Type here to translate!"
        onChangeText={newText => { 
          set_expression(newText)
        }}
      />
      <Text style={{padding: 10, fontSize: 42}}>
        {
          result
        }
      </Text>
      <View>
        <Button title='Calculate' onPress={ () =>{
          try {
            var currentResult = eval(expression);
            set_result(currentResult);
            var currentHistory = history
            currentHistory.push({
              'id': parseInt(history.length) + 1,
              'expression': expression,
              'value': currentResult,
            })
            set_history(currentHistory)
            set_search_history(currentHistory)
            console.log(history)
            

          }
          catch(err){
            console.log(err)
          }
        }
}></Button>

      <Expression placeholder='Type to search'
      onChangeText={searchString =>{
        var a = history.filter(value =>{
          return ( value.expression.includes(
            searchString) || value.value.toString().includes(searchString)
          )
        })

        set_search_history(a)
      }
      }/>
        <FlatList
        data={search_history}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      </View>
    </View>
  );
}

export default PizzaTranslator;