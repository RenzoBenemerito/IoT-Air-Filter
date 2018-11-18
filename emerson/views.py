from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.http import HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
import requests
from django.contrib import messages
import xlsxwriter
import os
from django.conf import settings
from django.http import HttpResponse, StreamingHttpResponse
import json
from io import BytesIO


def index(request):
    return render(request, 'index.html')


def reports(request):
    if request.method == "POST":
        
        output = BytesIO()

        
        
        #data = request.POST.getlist('data')
        data = request.POST['data_report'] 
        
        data = json.loads(data)
        data = data['data']
        header_list = ['Time', 'Dust Level']
        # Create a workbook and add a worksheet.
        workbook = xlsxwriter.Workbook(output)
        worksheet = workbook.add_worksheet()

        # These are samples of a row and column data
        # Some data we want to write to the worksheet.
        # expenses = (
        #     ['Rent', 1000],
        #     ['Gas', 100],
        #     ['Food', 300],
        #     ['Gym', 50],
        # )

        # Start from the first cell. Rows and columns are zero indexed.
        row = 0
        col = 0

        for heading in header_list:
            worksheet.write(row,col,heading)
            col += 1

        row = 1
        col = 0

        for item in data:
            col = 0
            for column in item:
                worksheet.write(row,col,column)
                col += 1
            row += 1

        workbook.close()
        output.seek(0)
        response = StreamingHttpResponse(
            output, content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        )
        response['Content-Disposition'] = 'attachment; filename=Report.xlsx'


        
    return response
    