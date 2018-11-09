import React, { Component } from 'react'
import Button from 'react-bootstrap/lib/Button'
import logo from './logo.svg'
import Web3 from 'web3'
import './App.css'
import config from './config.js'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.web3 = null
    this.EventEmitterContractInstance = null
    this.state = {
      "isLoading": false
    }
  }

  render = () => {
    return (
      <div className="App">
        <header className="App-header">
          <h2 style={{
            position: 'absolute',
            top: '100px',
            padding: '0 20%',
          }}>This simple DApp executes smart-contract method which emits event, and DApp subscribes to this event and shows toast with event param.
            <h4>
              <i>Note:</i> Smart-contracts are deployed to POA core and Sokol networks.
            </h4>
          </h2>
          <Button onClick={() => this.executeContract()} disabled={this.state.isLoading}>Execute Contract</Button>
          {this.renderLoader()}
          <ToastContainer />
        </header>
      </div>
    );
  }

  renderLoader = () => {
    if (!this.state.isLoading) {
      return null
    }

    return (
      <div>
        <label className='small'>waiting for event...</label>
      </div>
    )
  }

  componentDidMount = () => {
    if (window.web3) {
        this.web3 = new Web3(window.web3.currentProvider)
        const EventEmitterContract = this.web3.eth.contract(config.contract.abi)
        const networkID = this.web3.version.network;
        this.EventEmitterContractInstance = EventEmitterContract.at(config.contract.addresses[networkID])
        const contractEvent = this.EventEmitterContractInstance.FunctionCalled()
        contractEvent.watch((error, result) => {
          this.setState({
            "isLoading": false
          })
          if (error) {
            console.log(error)
          }
          console.log(result)
          this.notify(`Event has been successfully emitted with id ${result.args._id} !`)
        })
    }
  }

  executeContract = () => {
    this.setState({
      "isLoading": true
    })
    const emitEvent = this.EventEmitterContractInstance.emitEvent
    const _id = this._getRandomInt(0, 1000)
    emitEvent.sendTransaction(_id, {
      from: this.web3.eth.accounts[0]
    }, (error, txHash) => {
      if (error) {
        console.log(error)
      }
      console.log(`txHash: ${txHash}`)
    })
  }

  notify = (message) => toast(message);

  _getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
}

export default App;
