import React, { Component } from "react";

export class SnackBar extends Component {
    state = {
        openUpdate: false,
      };
  render() {
    return (
      <div class="mdc-snackbar">
        <div
          class="mdc-snackbar__surface"
          role="status"
          aria-relevant="additions"
        >
          <div class="mdc-snackbar__label" aria-atomic="false">
           ERR {this.props.err}
          </div>
          <div class="mdc-snackbar__actions" aria-atomic="true">
            <button type="button" class="mdc-button mdc-snackbar__action">
              <div class="mdc-button__ripple"></div>
              <span class="mdc-button__label">Retry</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default SnackBar;
