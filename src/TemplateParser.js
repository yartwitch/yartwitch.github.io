import React from 'react';

class TemplateParser
{
    static parseTemplate(str)
    {
        var tag = TemplateParser.parseTag(str);
        if (!tag)
            return str;
        
        switch(tag.tag)
        {
            case 'a':
                return TemplateParser.createLink(tag);
            case 'img':
                return TemplateParser.createImg(tag);
            default:
                return str;
        }
    }

    static parseTag(str)
    {
        const tagMatch = str.match(/!\[(.*)\]\((.*)\)/);
        if (!tagMatch)
            return null;
        var tag = tagMatch[1];
        var attr = tagMatch[2];
        var attrTokens = attr.split(',').map(tkn => tkn.split('='));
        return {tag: tag, attr: attrTokens };
    }

    static createImg(tag)
    {
        var src = TemplateParser.getAttributeValue(tag.attr, 'src');
        return <img className='mt-3 mb-3' src={src} alt=''></img>
    }

    static createLink(tag)
    {
        var href = TemplateParser.getAttributeValue(tag.attr, 'href');
        var txt = TemplateParser.getAttributeValue(tag.attr, 'txt');
        var target = TemplateParser.getAttributeValue(tag.attr, 'target');

        return <a href={href} target={target}>{txt || href}</a>
    }

    static getAttributeValue(attr, name)
    {
        if(!attr)
            return '';
        
        var fa = attr.filter(at => at[0] === name);
        if(!fa || fa.length === 0 || fa[0].length === 0)
            return '';
        return fa[0][1];
    }
}

export default TemplateParser;