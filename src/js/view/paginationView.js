import View from './View.js';
import icons from 'url:../../img/icons.svg'; // Parcel 2

class PaginationView extends View {
    _parentElement = document.querySelector('.pagination');

    addHandlerClick(handler) {
        this._parentElement.addEventListener('click', function(e) {
            const btn = e.target.closest('.btn--inline');
            
            if(!btn) return;

            const goToPage = +btn.dataset.goto;

            handler(goToPage);
        })
    }

    _generateMarkup () {
        const curPage = this._data.page;

        const numOfPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);
        console.log(`Number of pages are ` + numOfPages);

        // Page 1, and if there are other pages
        if(curPage === 1 && numOfPages > 1) {
            return this._generateMarkupButtonNext()
        } 

        // Last page 
        if(curPage === numOfPages && numOfPages > 1) {
            return this._generateMarkupButtonPrev()
        }
        
        // Other page
        if(curPage < numOfPages) {
            return `
            ${this._generateMarkupButtonPrev()}
            ${this._generateMarkupButtonNext()}
            `
        }

        // Page 1, and there are NO other pages
        return '';
    }

    _generateMarkupButtonNext () {
        const curPage = this._data.page;
        
        return `
        <button data-goto="${curPage + 1}" class="btn--inline pagination__btn--next">
        <span>Page ${curPage + 1}</span>
          <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
          </svg>
      </button>
        `
    }

    _generateMarkupButtonPrev () {
        const curPage = this._data.page;

        return `
        <button data-goto="${curPage - 1}" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
       <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${curPage - 1}</span>
        </button>
        `
    }
}

export default new PaginationView();