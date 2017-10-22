
  export function getViewType() {
    let viewType = localStorage.getItem('viewType')

    return viewType
  }

  export function setViewType(event, child) {

    let viewType = child.props.value

    if (viewType !== undefined) {
      localStorage.setItem('viewType', child.props.value)
    }
  }