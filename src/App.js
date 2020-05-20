import React, { Component } from "react";
import back from './assets/images/back.png';
import folderImg from './assets/images/folder.png';
import deleteImg from './assets/images/delete.png';
import 'antd/dist/antd.css';
import {
  Card,
  Input,
  Button,
  Modal
} from "antd";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      directoryTree:[
      ],
      navigationStack:[],
      modalVisiable:false,
      newFolderName:"",
      showResponceModal: false,
      isError: false,
      message:""
    }
  }
  handleChange=(e)=>{
    const name = e.target.name;
    this.setState({ [name]: e.target.value });
  }
  goBack=()=>{
    var navigationStack = this.state.navigationStack
    navigationStack.pop()
    this.setState({navigationStack});
  }
  delete=(i)=>{
    var directoryTree = this.state.directoryTree;
    var navigationStack = this.state.navigationStack;
    var obj = {
      name: this.state.newFolderName,
      content: []
    };
    var item=directoryTree;
    navigationStack.forEach((path)=>{
      item=item[path].content
    })
    var message = "Folder '"+item[i].name+"' Deleted Successfully."
    item.splice(i,1)
    this.setState({directoryTree,isError:false, message,showResponceModal:true});
  }
  createNewFolder=()=>{
    this.setState({modalVisiable:true})
  }
  addDirectory=()=>{
    var directoryTree = this.state.directoryTree;
    var navigationStack = this.state.navigationStack;
    var newFolder = {
      name: this.state.newFolderName,
      content: []
    };
    var item=directoryTree;
    navigationStack.forEach((path)=>{
      item=item[path].content
    })
    let obj = item.find(o => o.name === this.state.newFolderName);
    var isError=false;
    var message="";
    if(obj) {
      isError=true;
      message="Cannot create folder, folder with the same name already exists.";
    }else{
      item.push(newFolder);
      message="Folder '"+this.state.newFolderName+"' Created Successfully";
    }
    this.setState({modalVisiable:false,directoryTree,newFolderName:"",showResponceModal:true,isError,message})
  }
  closeModal=()=>{
    this.setState({modalVisiable:false})
  }
  goToDirectory=(i)=>{
    var navigationStack = this.state.navigationStack
    navigationStack.push(i)
    this.setState({navigationStack});
  }
  render() {
    var directory=this.state.directoryTree;
    var currentPath = "/"
    this.state.navigationStack.forEach((path)=>{
      currentPath+=directory[path].name+"/"
      directory=directory[path].content;
    })
    debugger;
    return (
      <div style={{padding:25}}>
         <Modal visible={this.state.modalVisiable} onCancel={this.closeModal} onOk={this.addDirectory} okText="Create Folder">
           <div style={{padding:20}}>
              <span>Enter Folder Name</span>
              <Input name="newFolderName" value={this.state.newFolderName} onChange={this.handleChange}/>
           </div>
         </Modal>
         <Modal visible={this.state.showResponceModal} onCancel={()=>{this.setState({showResponceModal:false})}} footer={null}>
           <div style={{padding:20,textAlign:"center",alignItems:"center"}}>
              <h3 style={{color:this.state.isError ?"red":"green"}}>{this.state.message}</h3>
           </div>
         </Modal>
          <h1>Directory Structure Implementation</h1>
          <div style={{marginTop: 20, display:"flex",alignItems: "center"}}>
            <Button style={{marginRight: 40, display:"flex",alignItems:"center"}} onClick={this.goBack} disabled={this.state.navigationStack.length==0}>
              <img src={back} alt="" style={{height: 20}} />
              <h3 style={{margin:0,marginLeft: 10}}>Go Back</h3>
            </Button>
            <h3 style={{flex:1}}>{currentPath}</h3>
            <Button onClick={this.createNewFolder}>+ Create New Folder</Button>
          </div>
          <hr></hr>
          <div>
          {
            directory.map((key, i) => {
                var name = key.name;
                return (
                  <div style={{display: "flex", margin: 20, alignItems: "center", width:"100%",cursor:"pointer" }} key={i} onDoubleClick={() => this.goToDirectory(i)}>
                    <img src={folderImg} alt="" style={{marginRight:30}} />
                    <b style={{marginRight:30}}>{name}</b>
                    <div style={{width:30,cursor:"pointer"}} onClick={() => this.delete(i)}>
                      <img src={deleteImg} alt="" style={{width:20}}/>
                    </div>
                  </div>
                )
            })
          }
          </div>
      </div>
    )
  }
}

export default App;