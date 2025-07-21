import React from 'react';
import TemplateOne from './TemplateOne';
import TemplateTwo from './TemplateTwo';

function PortfolioPreview({ data }) {
  // Choose template based on data.template
  if (data.template === 'two') {
    return <TemplateTwo data={data} />;
  }
  return <TemplateOne data={data} />;
}

//export default PortfolioPreview;
