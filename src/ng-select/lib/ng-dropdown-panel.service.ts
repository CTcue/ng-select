export interface ItemsRangeResult {
    scrollHeight: number;
    topPadding: number;
    start: number;
    end: number;
}

export interface PanelDimensions {
    itemHeight: number;
    panelHeight: number;
    itemsPerViewport: number;
}

export class NgDropdownPanelService {

    private _dimensions: PanelDimensions = {
        itemHeight: 0,
        panelHeight: 0,
        itemsPerViewport: 0
    };

    get dimensions() {
        return this._dimensions;
    }

    calculateItems(scrollPos: number, itemsLength: number, buffer: number): ItemsRangeResult {
        const d = this._dimensions;
        const scrollHeight = d.itemHeight * itemsLength;

        const scrollTop = Math.max(0, scrollPos);
        const indexByScrollTop = scrollTop / scrollHeight * itemsLength;
        let end = Math.min(itemsLength, Math.ceil(indexByScrollTop) + (d.itemsPerViewport + 1));

        const maxStartEnd = end;
        const maxStart = Math.max(0, maxStartEnd - d.itemsPerViewport);
        let start = Math.min(maxStart, Math.floor(indexByScrollTop));

        let topPadding = d.itemHeight * Math.ceil(start) - (d.itemHeight * Math.min(start, buffer));
        topPadding = !isNaN(topPadding) ? topPadding : 0;
        start = !isNaN(start) ? start : -1;
        end = !isNaN(end) ? end : -1;
        start -= buffer;
        start = Math.max(0, start);
        end += buffer;
        end = Math.min(itemsLength, end);

        return {
            topPadding,
            scrollHeight,
            start,
            end
        }
    }

    setDimensions(itemHeight: number, panelHeight: number) {
        const itemsPerViewport = Math.max(1, Math.floor(panelHeight / itemHeight));
        this._dimensions = {
            itemHeight,
            panelHeight,
            itemsPerViewport
        };
    }

    getScrollTo(itemTop: number, itemHeight: number, lastScroll: number) {
        const { panelHeight } = this.dimensions;

        const itemBottom = itemTop + itemHeight;

        const viewportTop = lastScroll;
        const viewportBottom = viewportTop + panelHeight;

        /**
         * Return if the bottom of the item is visible
         * and the scroll position has not changed
         */
        if (panelHeight >= itemBottom && lastScroll === itemTop) {
            return null;
        }

        // Scroll down if the bottom of the item is outside the viewport
        if (itemBottom > viewportBottom) {
            return viewportTop + (itemBottom - viewportBottom);

        // Scroll up if the top of the item is outside the viewport
        } else if (itemTop <= viewportTop) {
            return itemTop; // This works well for obvious reasons
        }

        return null;
    }
}
