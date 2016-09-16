/** @jsx React.DOM */

var ComicContainer = React.createClass({
	loadComics: function(){
    var publicKey = "313039c3952a61decd289e888f32325a";
  	var url = "http://gateway.marvel.com/v1/public/comics?apikey=" + publicKey;
  	$.get(url).then(function(data){
			this.setState({ comics: data.data.results });
		}.bind(this));
	},
	getInitialState: function(){
		return{ comics: [] };
	},
	componentWillMount: function(){
		this.loadComics();
	},
	render: function(){
		return(
			<ComicList comics={this.state.comics} />
		)
	}
});

var ComicList = React.createClass({
	render: function(){
		var comics = this.props.comics.map(function(comic){
			return <Comic comic={comic} />;
		});
		return <div>{comics}</div>
	}
});

var Comic = React.createClass({
	getImage: function(){
		return this.props.comic.thumbnail.path + "." + this.props.comic.thumbnail.extension;
	},
	render: function(){
		return (
			<div>
        <a href="#">
          <img src={this.getImage()} />
        </a>
			</div>
		);
	}
});

React.renderComponent(
	<ComicContainer />, document.getElementById('comic-container')
);
