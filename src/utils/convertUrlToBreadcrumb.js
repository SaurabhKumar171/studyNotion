export const convertUrlToBreadcrumb = (url) =>{
    const parts = url.split('/');
    const filteredParts = parts.filter(part => part.trim() !== '');

    const breadcrumbs = filteredParts.map((part, index) => {
        const capitalizedPart = part.replace(/-/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        if (index === filteredParts.length - 1) {
            return capitalizedPart;
        }
        return capitalizedPart + ' / ';
    });

    const cleanedBreadcrumb = breadcrumbs.join('').replace('Dashboard / ', '');

    return cleanedBreadcrumb;
}