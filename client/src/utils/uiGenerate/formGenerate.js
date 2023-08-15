const fs = require("fs");
const path = require("path");

const formGenerate = (module) => {
  const { ModelName } = module;
  const { Fields } = module;
  const lowerCase = `${ModelName}`.toLowerCase();

  const filePath = path.join(
    __dirname.replace("utils/uiGenerate", `components/${lowerCase}`),
    `${ModelName}Form.js`
  );

  let formField = [];

  Fields?.forEach((field, idx) => {
    const ref = field.Reference;

    if (field.UIType === "Select" && ref) {
      const refref = `${ref}`.toLowerCase();
      const content = `
      const [${refref}${idx}List, set${refref}${idx}List] = useState([]);

      const get${ref}${idx} = async () => {
        const res = await fetch("http://localhost:5000/api/${refref}/list", {
          method: "GET",
        })
          .then((resdata) => resdata)
          .catch((err) => console.log(err));
    
        const { data, result } = await res.json();
    
        if (result) {
          set${refref}${idx}List(
            data?.map((item) => ({
              Label: item?.${field?.RefTitle},
              Value: item?._id,
            }))
          );
        }
      }

      useEffect(() => {
        get${ref}${idx}()
      }, [])`;
    } else {
    }
  });
};

const dynamicObject = {
  ModelName: "Product1",
  Fields: [
    {
      FieldName: "Title",
      Type: "String",
      UIType: "Input",
      Required: true,
      Unique: true,
      Reference: "",
      Default: "Test Title",
    },
    {
      FieldName: "Category",
      Type: "String",
      UIType: "Select",
      Required: false,
      Unique: false,
      Reference: "BaseModel",
      Default: "",
    },
    {
      FieldName: "Status",
      Type: "Boolean",
      UIType: "Switch",
      Required: false,
      Unique: false,
      Reference: "",
      Default: "false",
    },
  ],
};

formGenerate(dynamicObject);
