import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

export class AuthorView extends React.Component{
    keypressCallback(event){
        console.log(event.key);
    }
    
    componentDidMount(){
        document.addEventListener('keypress', this.keypressCallback);
    }
    
    componentWillUnmount() {
        document.removeEventListener('keypress', this.keypresssCallback);
    }

    render() {
        const { author, onBackClick } = this.props

        if(author.Death === null) {
            return(
                <div className="author-view">
                    <div className="author-name">
                        <h2>{author.Name}</h2>
                    </div>
                    <div>
                        <img alt="author" className="author-img" crossOrigin="anonymous" src={author.ImageURL} />
                    </div>
                    <div className="author-bio">
                        <p><b>Bio</b>: {author.Bio}</p>
                    </div>
                    <div className="author-birth">
                        <p><b>Birth Year</b>: {author.Birth}</p>
                    </div>
                    
                    <Button id="author-button" onClick={() => { onBackClick(null); }}>Back</Button>
                </div>
            );
        } else {
            return(
                <div className="author-view">
                    <div className="author-name">
                        <h2>{author.Name}</h2>
                    </div>
                    <div>
                        <img alt="author" className="author-img" crossOrigin="anonymous" src={author.ImageURL} />
                    </div>
                    <div className="author-bio">
                        <p><b>Bio</b>: {author.Bio}</p>
                    </div>
                    <div className="author-birth">
                        <p><b>Birth Year</b>: {author.Birth}</p>
                    </div>           
                    <div className="author-death">
                        <p><b>Death</b>: {author.Death}</p>
                    </div>
                    
                    <Button id="author-button" onClick={() => { onBackClick(null); }}>Back</Button>
                </div>    
            );
        }
    }   
}

AuthorView.propTypes = {
    author: PropTypes.shape({
          Name: PropTypes.string.isRequired,
          Bio: PropTypes.string.isRequired,
          Birth: PropTypes.number.isRequired,
          Death: PropTypes.number
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
};