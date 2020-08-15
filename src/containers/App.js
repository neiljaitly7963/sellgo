import React, {Component} from 'react';
import { connect } from 'react-redux';

import SearchBox from '../components/SearchBox';
import EnhancedTable from '../components/EnhancedTable';
import './App.css';

import ErrorBoundry from '../components/ErrorBoundry';
import { setSearchField, requestRobots, sortRobots, deleteRobots } from '../actions'

const mapStateToProps = state => {
	return {
		searchField: state.searchRobots.searchField,
		robots: state.requestRobots.robots,
		isPending: state.requestRobots.isPending,
		error: state.requestRobots.error
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
		onRequestRobots: (url) => dispatch(requestRobots(url)),
		onRequestSort: (temp) => dispatch(sortRobots(temp)),
		ondeleteRobots: (deletedArray) => dispatch(deleteRobots(deletedArray))
	}
}


class App extends Component {
	sortRobots = () => {
		let temp = JSON.parse(JSON.stringify(this.props.robots));
		temp.data.sort(function(a, b){
	    	var nameA=a.Title.toLowerCase(), nameB=b.Title.toLowerCase()
	    	if (nameA < nameB) //sort string ascending
	        	return -1 
	    	if (nameA > nameB)
	        	return 1
	    	return 0 //default return value (no sorting)
		})
		console.log(this.props.robots, "see carefully")
		console. log(temp, "temp")
		console.log(this.props.robots, "the robots state")
		this.props.onRequestSort(temp)
	}	

	sortRobotsbyYear = () => {
		let temp = JSON.parse(JSON.stringify(this.props.robots));
		temp.data.sort(function(a, b){
		    return a.Year-b.Year
		})
		this.props.onRequestSort(temp)
	}

	deleteItem = (i, event) => {
		let deletedArray = JSON.parse(JSON.stringify(this.props.robots));
	    deletedArray.data.splice(i, 1);
		this.props.ondeleteRobots(deletedArray)
  	}

	render() {
			const { searchField, onSearchChange, robots, isPending } = this.props;
			// const filteredRobots = robots.filter(robot => {
			// 	return robot.name.toLowerCase().includes(searchField.toLowerCase())
			// })
			console.log("https://jsonmock.hackerrank.com/api/movies/search/?Title="+searchField, "THE CONCAT ")
			
			return typeof robots.data === 'undefined' ?
				<div className='tc'>
					<h1 className="f2">Search Movies</h1>	
					<div className='flex justify-center'>
						<SearchBox searchChange={onSearchChange} onRequestRobots={this.props.onRequestRobots} searchField={this.props.searchField} />
					</div>			  	
			  	</div>	
			:
			(
			  	<div className='tc'>
					<h1 className="f2">Search Movies</h1>
					<div className='flex justify-center'>
						<SearchBox searchChange={onSearchChange} onRequestRobots={this.props.onRequestRobots} searchField={this.props.searchField} />
					</div>
					
						<ErrorBoundry>
				  			<EnhancedTable robots={robots.data} sortRobots={this.sortRobots} sortRobotsbyYear={this.sortRobotsbyYear} deleteItem={this.deleteItem}/>
				  		</ErrorBoundry>
				  
			  	</div>
			)
			}	
}

export default connect(mapStateToProps, mapDispatchToProps)(App);