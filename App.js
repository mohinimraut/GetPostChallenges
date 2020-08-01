import {Container,Header,Content,Form,Item,Input,Label,Button, ListItem,List,Icon,Fab,Picker,Body,Card} from 'native-base'
import * as firebase from 'firebase';
   import React from 'react';
import { View, Text,FlatList} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { ScrollView } from 'react-native-gesture-handler';
// import CreateChallange from './src/CreateChallange'

const firebaseConfig = {
  apiKey: "AIzaSyDG6wgspWq86fh6vG1CV8NCSFRBCtO9brU",
  authDomain: "fir-rn-77117.firebaseapp.com",
  databaseURL: "https://fir-rn-77117.firebaseio.com",
  projectId: "fir-rn-77117",
  storageBucket: "fir-rn-77117.appspot.com",
  messagingSenderId: "161950307698",
  appId: "1:161950307698:web:10146570a720b5ef5779eb"
};
firebase.initializeApp(firebaseConfig);



class Feed extends React.Component{
  state={
 challengeid:"",
 amount:"",
 mylist:[],
 
}

componentDidMount(){
const myitems=firebase.database().ref("mywishes");
myitems.on("value",datasnap=>{

if(datasnap.val()){
this.setState({mylist:Object.values(datasnap.val())})
}
 

})
}
saveitem(){
//  console.log(this.state.text)
const myitems=firebase.database().ref("mywishes");

myitems.push().set({
  challengeid:this.state.challengeid,
 amount:this.state.amount,
 user:this.state.user,
 time:Date.now()
})

this.setState({challengeid:"",user:""})
}

removeIt(){
firebase.database().ref("mywishes").remove()
this.setState({mylist:[{challengeid:"removed successfuly"}]})
}
renderItem=({item})=>{
  return(
<View style={{flex:1,margin:10}}>
<Card style={{backgroundColor:'#fff',flex:1,padding:20,borderRadius:10,margin:10}}>
<View style={{flexDirection:'row',flex:1,justifyContent:'space-between'}}>
<Text style={{fontWeight:'bold'}}>{item.user}</Text>
<Text style={{fontWeight:'bold'}}>Challenge_Amount:{'\u20B9'}{item.amount}</Text>
</View>

<View style={{flexDirection:'row',justifyContent:'space-between'}}>
<Text>Challenge_id:{item.challengeid}</Text>
<Text style={{color:'gray'}}>{new Date(item.time).toString().slice(0,-14)}</Text>

</View>
</Card>
</View>

  )


}

render(){
  

return(

<View style={{backgroundColor:'#EBECF0',flex:1}}>
          
         
           <FlatList
           data={this.state.mylist}
           renderItem={this.renderItem}
           />

<Fab
   direction="up"
 
  style={{ backgroundColor: '#eba259',borderRadius:5 }}
  position="bottomRight"
  onPress={() => this.props.navigation.navigate('CreateChallange')}>
  <Icon type="MaterialCommunityIcons" size={40} name="plus" />
 
</Fab>
</View>

);

}

}

class CreateChallange extends React.Component{
  
  state={
    challengeid:"",
 mylist:[],
 selected:"key1",
}

componentDidMount(){
const myitems=firebase.database().ref("mywishes");
myitems.on("value",datasnap=>{

if(datasnap.val()){
this.setState({mylist:Object.values(datasnap.val())})
}
 

})
}

onValueChange(value: string) {
  this.setState({
    selected: value
  });
}


saveitem(){
//  console.log(this.state.text)
const myitems=firebase.database().ref("mywishes");

myitems.push().set({
  challengeid:this.state.challengeid,
 amount:this.state.amount,
user:this.state.user,
 time:Date.now()
})

this.setState({challengeid:""})
}

removeIt(){
firebase.database().ref("mywishes").remove()
this.setState({mylist:[{challengeid:"removed successfuly"}]})
}

render(){
const myitems=this.state.mylist.map(item=>{
return(
<ListItem style={{justifyContent:"space-between"}} key={item.time}>
<Text>{item.challengeid}</Text>
<Text>{item.amount}</Text>
<Text>{item.user}</Text>
<Text>{new Date(item.time).toString().slice(0,-14)}</Text>


</ListItem>
)
})

return(

<View style={{flex:1,backgroundColor:'#fff',paddingTop:10,margin:10}}>
<Card style={{backgroundColor:'dodgerblue',margin:20,borderRadius:20}}>

<Item floatingLabel>
  <Label>Challenge Id</Label>
  <Input
  value={this.state.challengeid}
  onChangeText={(challengeid)=>this.setState({challengeid})}
  />
</Item>

<Item floatingLabel>
  <Label>Amount</Label>
  <Input
  value={this.state.amount}
  onChangeText={(amount)=>this.setState({amount})}
  />
</Item>



<Item floatingLabel>
  <Label>Enter user name</Label>
  <Input
  value={this.state.user}
  onChangeText={(user)=>this.setState({user})}
  />
</Item>




<View style={{flexDirection:'row',justifyContent:'space-between'}}> 
  <Button style={{padding:10,width:120}} rounded success
  onPress={()=>this.saveitem()}
  >
    <Text style={{color:"white"}}>Add Challenge</Text>
  </Button>

<Button style={{padding:20,width:100}} rounded danger
onPress={()=>this.removeIt()}
>
    <Text style={{color:"white"}}>Delete</Text>
  </Button>





{/* <Fab
    style={{ backgroundColor: '#eba259',borderRadius:5 }}
    </Fab> */}

<Button style={{padding:20,width:100}} rounded warning
  onPress={() => this.props.navigation.navigate('Feed')}>
   <Icon type="MaterialCommunityIcons" size={40} name="close" />
 </Button>



</View>


</Card>

</View>

);

}

}





const RootStack = createStackNavigator({
  Feed: {
    screen: Feed,
    navigationOptions: {
      title: 'Challenges',
      
    },
},
  Details: DetailsScreen,
  CreateChallange: {
    screen:CreateChallange ,
    navigationOptions: {
      title: 'Add Challenge',
     
    },
},

 



});

export default createAppContainer(RootStack);