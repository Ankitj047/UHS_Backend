const pdfTemplate = `<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link
      href="https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap"
      rel="stylesheet"
    />
    <style type="text/css">
      @page {
        margin: 50px 25px;
      }

      body,
      .list {
        list-style-type: disc;
      }
      th,
      b,
      strong {
        font-weight: bold;
      }
      * {
        box-sizing: border-box;
        font-family: "Poppins", sans-serif;
        font-style: normal;
        font-weight: normal;
        font-display: swap;
      }
      .color-white {
        color: white;
      }
      .color-2b5da7 {
        color: #2b5da7;
      }
      .color-0791bb {
        color: #0791bb;
      }

      .color-5b9bd5 {
        color: #5b9bd5;
      }

      .color-bb0707 {
        color: #bb0707;
      }
      .color-000000 {
        color: #000000;
      }
      .bg-color-2b5da7 {
        background-color: #2b5da7;
      }
      .bg-color-0799c3 {
        background-color: #0799c3;
      }
      .bg-color-5b9bd5 {
        background-color: #5b9bd5;
      }
      img {
        max-width: 100%;
      }
      .text-center {
        text-align: center;
      }
      .text-right {
        text-align: right;
      }
      .text-left {
        text-align: left;
      }

      .mtb-2 {
        margin: 2px 0 !important;
      }
      /************************************ */
      .logo-wrap {
        text-align: center;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        vertical-align: top;
      }
      table tr th,
      table tr td {
        padding: 5px 10px;
        text-align: left;
      }
      .custom-table th {
        padding: 5px 10px;
        font-size: 14px;
      }

      .custom-table tr {
        border-bottom: 1px solid #dee2e6;
      }
      table-border .custom-table tr td {
        vertical-align: top;
      }

      .custom-table h3 {
        font-size: 14px;
        margin-bottom: 0;
        line-height: 10px;
      }

      .table-bordered {
        border: 1px solid #000000;
        margin-bottom:100px;
      
      }

      .table-bordered th,
      .table-bordered td {
        padding: 3px 10px;
        border: 1px solid #000000;
      }

      .card {
        position: relative;
        margin-top: 25px;
        margin-bottom: 25px;
        padding: 20px;
        border-radius: 25px;
        border: 2px solid #0c0f1e;
      }

      ul,
      li {
        list-style-type: disc;
      }

      ul.custom-list li {
        display: inline-block;
        text-align: center;
      }
      div{
        display: flex;justify-content: space-between;flex-direction:row;
      }
    </style>
  </head>
  <body>
  <div>
    <img src="http://icecream.me/uploads/f31796c25f1d90f2947cebfe6a7b9d7b.png" alt="Logo" width="60px" height="60px">
    <pre style="border:1px solid gray;height:30px;width:200px;text-align:center;line-height: 1.6;float:right;">{{siteId}}</pre>
    <pre style="float:right;
    width: 40%;
    ">
  </div>
  <table class="table-bordered">
    <tr>
      <td><strong>Client Name</strong></td>
      <td>{{customer}}</td>
    </tr>
    <tr>
      <td><strong>age</strong></td>
      <td>{{age}}</td>
    </tr>
    <tr>
      <td><strong>phone</strong></td>
      <td>{{phone}}</td>
    </tr>
  </table>
</body>
</html>
`;

module.exports = pdfTemplate