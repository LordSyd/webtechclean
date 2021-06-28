import React from 'react';

export default function NewsCard(props){

    return(
        <div className="col" key={props.title}>
            <div className="card" >
                <div className="col over" >
                    <div className="col layer" ><img src={props.img}  className="card-img-top img-fluid" alt={props.title} /></div>
                </div>
                <div className="card-body">
                    <h5 className="card-title">{props.title}</h5>
                    <p className="card-text">{props.description}</p>
                    <p className="card-text lead">Click Card to read more</p>
                    <a href={props.url} className="stretched-link" target="_blank" rel="noreferrer" alt="click"/>
                </div>
            </div>
        </div>
    )
}