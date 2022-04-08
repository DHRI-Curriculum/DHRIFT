# XML (file format)

XML or eXstensible Markup Language is a file format that uses a nested structure where the "tags" like `<Cat>` contain other tags inside them, like `<firstName>`. This format is good for organizing the layout of a document in a tree-like format, just like HTML, where we want to nest elements like a sentence within a paragraph, for example. XML does not carry any information about how to be displayed and can be used in a variety of presentation scenarios. 

```xml
<Cats> 
    <Cat> 
        <firstName>Smally</firstName> 
        <lastName>McTiny</lastName> 
    </Cat> 
    <Cat> 
        <firstName>Kitty</firstName> 
        <lastName>Kitty</lastName> 
    </Cat> 
    <Cat> 
        <firstName>Foots</firstName> 
        <lastName>Smith</lastName> 
    </Cat> 
    <Cat> 
        <firstName>Tiger</firstName> 
        <lastName>Jaws</lastName> 
    </Cat> 
</Cats> 
```