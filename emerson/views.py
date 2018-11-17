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
from django.http import HttpResponse
from PyQt5.QtWidgets import QFileDialog

def index(request):
    return render(request, 'index.html')


def reports(request):
    if request.method == "POST":
        data = request.POST.getlist('data_report[]')
        print(type(data))
        fn = "hii"

        if fn != '':
            
            fn += ".xlsx"    

        header_list = ['Time', 'Dust Level']

        # Create a workbook and add a worksheet.
        workbook = xlsxwriter.Workbook(fn)
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
            worksheet.write(row,col,item)
            col += 1
            row += 1

        workbook.close()
    return HttpResponse('Success')
    