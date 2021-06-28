import React from 'react';

export default class Recipe extends React.Component{



    render() {
        const ingredients = this.props.ingredients.split(',').map((item) => item.toUpperCase());
        return (
            <div className="container py-5">
                <div className="row justify-content-center ">
                    <div className="col-11 col-md-8 col-lg-6">
                        <div className="card" >
                            <img src={this.props.thumbnail} className="card-img-top p-2" alt={this.props.title} />
                            <div className="card-body">
                                <h4 className="card-title rounded text-center py-2">
                                    {this.props.title}
                                </h4>
                                <p className="card-text">Maybe there some day will be a recipe here</p>
                                <div className="row justify-content-center text-center">
                                    <div className="col">
                                        <ul className="list-group pb-2">
                                            <li className="list-group-item" id="list-heading">
                                                <h3>
                                                    Ingredients
                                                </h3>
                                            </li>
                                            {ingredients.map((item) => <li key={item} className="list-group-item list-group-item-action list-group-item-secondary">{item}</li>)}
                                        </ul>
                                    </div>
                                </div>
                                <a href={this.props.href} className="btn btn-success" target="_blank" rel="noreferrer">To Recipe</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}