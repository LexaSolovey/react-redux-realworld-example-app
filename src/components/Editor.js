import React from 'react';

export default function Editor (props) {
  const removeTagHandler = (tag) => this.props.onRemoveTag(tag);

  const watchForEnter = event => {
    if (event.keyCode === 13) {
      event.preventDefault();
      this.props.onAddTag();
    }
  }

  const onUpdateField = ({target}) => this.props.onUpdateField(target.name, target.value);

  return (
    <form>
      <fieldset>
        <fieldset className="form-group">
          <input
            className="form-control form-control-lg"
            type="text"
            name="title"
            placeholder="Article Title"
            value={props.title}
            onChange={onUpdateField} />
        </fieldset>

        <fieldset className="form-group">
          <input
            className="form-control"
            type="text"
            name="description"
            placeholder="What's this article about?"
            value={props.description}
            onChange={onUpdateField} />
        </fieldset>

        <fieldset className="form-group">
          <textarea
            className="form-control"
            rows="8"
            name="body"
            placeholder="Write your article (in markdown)"
            value={props.body}
            onChange={onUpdateField}>
          </textarea>
        </fieldset>

        <fieldset className="form-group">
          <input
            className="form-control"
            type="text"
            name="tagInput"
            placeholder="Enter tags"
            value={props.tagInput}
            onChange={onUpdateField}
            onKeyUp={watchForEnter}
          />
          <div className="tag-list">
            {(props.tagList || []).map(tag => {
                return (
                  <span className="tag-default tag-pill" key={tag}>
                    <i  className="ion-close-round"
                        onClick={() => removeTagHandler(tag)}>
                    </i>
                    {tag}
                  </span>
                );
              })
            }
          </div>
        </fieldset>

        <button
          className="btn btn-lg pull-xs-right btn-primary"
          type="button"
          disabled={props.inProgress}
          onClick={props.submitForm}
        >
          Publish Article
        </button>

      </fieldset>
    </form>
  );
}
