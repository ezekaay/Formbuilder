const sidebarData = {
  basic: {
    Layout: [
      { label: "Container", type: "container" },
      { label: "Grid Layout", type: "grid-layout" },
      { label: "Column Layout", type: "column-layout" },
      { label: "Row Layout", type: "row-layout" },
    ],
    "Dividers & Breaks": [
      { label: "Divider", type: "divider" },
      { label: "Page Break", type: "page-break" },
      { label: "Spacer", type: "spacer" },
    ],
    "Text Formatting": [
      { label: "Heading", type: "heading" },
      { label: "Paragraph", type: "paragraph" },
      { label: "Rich Text Editor", type: "rich-text-editor" },
    ],
    "Form Organization": [
      { label: "Section Header", type: "section-header" },
      { label: "Tabs (Form Sections)", type: "tabs" },
      { label: "Accordion (Collapsible Sections)", type: "accordion" },
    ],
  },
  components: {
    "Text Inputs": [
      { label: "Text Field (Single Line)", type: "text-field" },
      { label: "Text Area (Multiple Lines)", type: "text-area" },
      { label: "Password Field", type: "password-field" },
      { label: "Search Input", type: "search-input" },
    ],
    "Selection Inputs": [
      { label: "Radio Buttons", type: "radio-buttons" },
      { label: "Checkboxes", type: "checkboxes" },
      { label: "Dropdown Select", type: "dropdown-select" },
      { label: "Multi-select Dropdown", type: "multi-select-dropdown" },
      { label: "Date Picker", type: "date-picker" },
      { label: "Time Picker", type: "time-picker" },
      { label: "Rating Stars", type: "rating-stars" },
    ],
    "Interactive Inputs": [
      { label: "Slider", type: "slider" },
      { label: "Range Selector", type: "range-selector" },
      { label: "Toggle Switch", type: "toggle-switch" },
      { label: "Stepper Input", type: "stepper-input" },
    ],
    "File & Signature Inputs": [
      { label: "File Upload", type: "file-upload" },
      { label: "Image Upload", type: "image-upload" },
      { label: "Signature Field", type: "signature-field" },
    ],
    "Payments & Pricing": [
      { label: "Product Selector", type: "product-selector" },
      { label: "Price Field", type: "price-field" },
      { label: "Coupon Code", type: "coupon-code" },
      { label: "Payment Gateway", type: "payment-gateway" },
    ],
    "Form Actions": [
      { label: "Button", type: "button" },
      { label: "Captcha", type: "captcha" },
      { label: "Submit Button", type: "submit-button" },
      { label: "Reset Button", type: "reset-button" },
    ],
    "Advanced Components": [
      { label: "Map Picker", type: "map-picker" },
      { label: "Barcode Scanner", type: "barcode-scanner" },
      { label: "QRCode Generator", type: "qrcode-generator" },
    ],
  },
};

const sidebarContent = document.querySelector(".sidebar__content");

const generateSidebar = (data) => {
  Object.entries(data).forEach(([tabId, sections], index) => {
    const sidebarSection = document.createElement("div");
    sidebarSection.classList.add("sidebar__section");
    sidebarSection.id = tabId;

    if (index === 0) {
      sidebarSection.classList.add("sidebar__section--active");
    }

    Object.entries(sections).forEach(([sectionTitle, items]) => {
      const sidebarItems = document.createElement("div");
      sidebarItems.classList.add("sidebar__items");
      const sidebarSectionTitle = document.createElement("h3");
      sidebarSectionTitle.classList.add(
        "sidebar__section-title",
        "text-body-medium"
      );
      sidebarSectionTitle.textContent = sectionTitle;

      sidebarItems.appendChild(sidebarSectionTitle);

      items.forEach(({ label, type }) => {
        const sidebarItem = document.createElement("div");
        sidebarItem.classList.add("sidebar__item");
        sidebarItem.setAttribute("draggable", "true");
        sidebarItem.setAttribute("data-type", type);
        sidebarItem.setAttribute("data-filter", label.toLowerCase());

        const sidebarItemIcon = document.createElement("span");
        sidebarItemIcon.classList.add("sidebar__item-icon");

        const sidebarItemLabel = document.createElement("span");
        sidebarItemLabel.classList.add("sidebar__item-label");
        sidebarItemLabel.textContent = label;

        sidebarItem.appendChild(sidebarItemIcon);
        sidebarItem.appendChild(sidebarItemLabel);
        sidebarItems.appendChild(sidebarItem);
      });
      sidebarSection.appendChild(sidebarItems);
    });
    sidebarContent.appendChild(sidebarSection);
  });
};

generateSidebar(sidebarData);


//implement tabs switching
const activeTab = (clickedTab) => {
    document.querySelectorAll('.sidebar__tab').forEach(tab => {
        tab.classList.remove('sidebar__tab--active');
        tab.setAttribute('aria-selected', 'false');
    });

    clickedTab.classList.add('sidebar__tab--active');
    clickedTab.setAttribute('aria-selected', 'true');

    document.querySelectorAll('.sidebar__section').forEach(section => {
        section.classList.remove('sidebar__section--active');
    });

    const target = clickedTab.dataset.tab;
    document.querySelector(`#${target}`).classList.add('sidebar__section--active');

}

document.querySelectorAll('.sidebar__tab').forEach(tab => {
    tab.addEventListener('click', (event) => {
        activeTab(event.target);
    })
})


// implementa search/filtering
const searchInput = document.querySelector(".sidebar__search-input");
const sidebarSectionTitle = document.querySelectorAll(".sidebar__section-title");

const filterSidebar = (input) => {
    const inputLowercase = input.toLowerCase();
    document.querySelectorAll(".sidebar__item").forEach((item) => {
      const itemType = item.dataset.type.toLowerCase();
      if (itemType.includes(inputLowercase)) {
        item.style.display = "flex";
      } else {
        item.style.display = "none";
      }
    });
}

searchInput.addEventListener('input', (event) => {
    const searchInput = event.target.value;
    filterSidebar(searchInput);
})