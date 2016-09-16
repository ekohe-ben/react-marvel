/** @jsx React.DOM */

var ComicContainer = React.createClass({
	loadComics: function() {
    var publicKey = "313039c3952a61decd289e888f32325a";
  	var url = "http://gateway.marvel.com/v1/public/comics?apikey=" + publicKey;
  	$.get(url).then(function(data) {
			this.setState({ comics: data.data.results });
		}.bind(this));
	},
	getInitialState: function() {
		return{ comics: [] };
	},
	componentWillMount: function() {
		this.loadComics();
	},

	render: function() {
		return (
			<div className="well">
				<ComicList comics={this.state.comics} />
			</div>
		)
	}
});

var ComicList = React.createClass({
	render: function() {
		var comics = this.props.comics.map(function(comic) {
			return <Comic comic={comic} />;
		});
		return <div className="row">{comics}</div>
	}
});

var Comic = React.createClass({
	getImage: function() {
		return this.props.comic.thumbnail.path + "." + this.props.comic.thumbnail.extension;
	},
	render: function() {
		return (
			<div className="col-sm-2">
				<ModalTrigger
					trigger={<a><img src={this.getImage()}/></a>}
					header={<h3>{this.props.comic.title}</h3>}
					body={
						<div>
							<div className="row">
								<div className="col-sm-3 text-center"><img src={this.getImage()}/></div>
								<div className="col-sm-9"><p>{this.props.comic.description}</p></div>
							</div>
						</div>
					}
					footer={<button data-dismiss="modal" className="btn btn-success">OK</button>}
				/>
			</div>
		);
	}
});

var ModalTrigger = React.createClass({
	handleClick: function(e) {
		$(this.refs.payload.getDOMNode()).modal();
	},
	render: function() {
		return (
			<div onClick={this.handleClick}>
				{this.props.trigger}
				<Modal ref="payload"
				  header={this.props.header}
					body={this.props.body}
					footer={this.props.footer}
				/>
			</div>
	  );
	}
});

var Modal = React.createClass({
	componentDidMount: function() {
		$(this.getDOMNode()).modal(
			{ background: true,
				keyboard: true,
				show: false
			})
	},
	componentWillUnmount: function() {
		$(this.getDOMNode()).off('hidden');
	},
	handleClick: function(e) {
		e.stopPropagation();
	},
	render: function() {
		return (
			<div onClick={this.handleClick} className="modal fade" role="dialog" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">{this.props.header}</div>
						<div className="modal-body">{this.props.body}</div>
						<div className="modal-footer">{this.props.footer}</div>
					</div>
				</div>
			</div>
		)
	}
});

React.renderComponent(
	<ComicContainer />, document.getElementById('comic-container')
);
