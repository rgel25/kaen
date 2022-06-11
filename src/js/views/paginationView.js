import View from './View';
import icons from '../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  _generateMarkup() {
    const currentPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1 and there are other pages
    if (currentPage === 1 && numPages > 1) {
      return this._generateMarkupBtn(currentPage + 1, 'next');
    }
    // Last page
    if (currentPage === numPages && numPages > 1) {
      return this._generateMarkupBtn(currentPage + -1, 'prev');
    }
    // Other page
    if (currentPage < numPages) {
      return (
        this._generateMarkupBtn(currentPage + -1, 'prev') +
        this._generateMarkupBtn(currentPage + 1, 'next')
      );
    }
    // Page 1 and No other pages
    return '';
  }

  _generateMarkupBtn(toPage, direction) {
    return `
      <button data-goto="${toPage}" class="btn--inline pagination__btn--${
      direction === 'prev' ? 'prev' : 'next'
    }">
      ${
        direction === 'prev'
          ? ` 
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
            </svg> `
          : ''
      }
               
            <span>Page ${toPage}</span>
            ${
              direction === 'next'
                ? ` 
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
            </svg> `
                : ''
            }
        </button>
      `;
  }

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }
}

export default new PaginationView();
