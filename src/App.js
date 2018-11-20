import React, { Component } from 'react'
import Button from 'react-bootstrap/lib/Button'
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
      "isLoading": false,
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
          }}>This simple DApp executes smart-contract method which emits an event, and DApp subscribes to this event and shows a toast with event param.
            <h4>
              <i>Note:</i> Smart-contracts have been deployed to POA core and Sokol networks.
            </h4>
          </h2>
          <Button onClick={() => this.executeContract()} disabled={this.state.isLoading || this.state.isRejected || (this.state.networkID !== 77 && this.state.networkID !== 99)}>Execute Contract</Button>
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

  componentWillMount = () => {
    if (window.ethereum) {
        this._getWeb3()
    } else if (window.web3) {
        this.web3 = new Web3(window.web3.currentProvider)
        this._subscribeToEvent()
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
        this.setState({
          "isLoading": false
        })
      }
      if (txHash) {
        console.log(`txHash: ${txHash}`)
      }
    })
  }

  notify = (message) => toast(message)

  _getWeb3 = async () => {
    this.web3 = new Web3(window.ethereum);
    try {
        // Request account access if needed
        await window.ethereum.enable()
        // Acccounts now exposed
        this._subscribeToEvent()
    } catch (error) {
        // User denied account access...
        this.setState({
          "isRejected": true
        })
    }
  }

  _subscribeToEvent = () => {
    const EventEmitterContract = this.web3.eth.contract(config.contract.abi)
    const networkID = this.web3.version.network;
    this.EventEmitterContractInstance = EventEmitterContract.at(config.contract.addresses[networkID])
    const contractEvent = this.EventEmitterContractInstance.FunctionCalled()
    const contractEvent2 = this.EventEmitterContractInstance.FunctionCalled2()
    this.setState({
      "networkID": Number(networkID)
    })
    contractEvent.watch((error, result) => {
      this.setState({
        "isLoading": false
      })
      if (error) {
        console.log(error)
        return
      }
      console.log(result)
      this.notify(`Event has been successfully emitted with id ${result.args._id} !`)
    })

    contractEvent2.watch((error, result) => {
      this.setState({
        "isLoading": false
      })
      if (error) {
        console.log(error)
        return
      }
      console.log(result)
      this.notify(`The second event has been successfully emitted with id ${result.args._id} !`)
    })
  }

  _getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  }
}

export default App;
