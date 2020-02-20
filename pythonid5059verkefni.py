import pandas as pd
#Read in data
myData = pd.read_csv("C:\\Users\LethalValdi\Documents\St Andrews\ID5059\Project1\Project1ID5059\pp-complete.csv",nrows = 100000, header =None)


myData.head()
myData.info()

#Get column names since they are not named in data
list(myData.columns)

list(modelData.columns)


#Select variables of interest
modelData = myData[[1,2,4,6,11]]

#Rename variables
modelData = modelData.rename(columns={1: "Price", 2: "Date",4: "Type", 6: "Duration", 11:"Location"})
modelData.info()

#Format date to better deal with it
modelData['Date'] = pd.to_datetime(modelData['Date'], format = '%Y-%m-%d')

#Get the months
modelData['Month'] = modelData['Date'].dt.month

#Check out data
modelData.info()
modelData.head(200)

trainData = modelData[modelData.Month != 12]
trainData.info()
testData = modelData[modelData.Month == 12]
testData.info()
 
#add dummy variable "one-hot encode variable" if location of house is in London
from pandas import DataFrame
modelData['isLondon'] = modelData['Location'].apply(lambda x: 1 if x == 'LONDON' else 0)

print (modelData) 

#Get dummy variables for each type of house and add to dataset
typeDummy = pd.get_dummies(modelData['Type'])
modelData = modelData.drop('Type',axis = 1)
modelData = modelData.join(typeDummy)

#Rename dummy variables for type of house because type of house and duration are both encoded with F 
modelData = modelData.rename(columns={'D': "TypeD",'F': "TypeF",'O': "TypeO", 'S': "TypeS", 'T': "TypeT"})

#Get dummy variables for each Duration category of the dataset
durationDummy = pd.get_dummies(modelData['Duration'])
modelData = modelData.drop('Duration',axis = 1)
modelData = modelData.join(durationDummy)

#Plot some graphs to see distribution of variables
import matplotlib.pyplot as plt
modelData.hist(bins=50, figsize=(20,15))
plt.show()

import seaborn as sns
sns.set()
sns.countplot(modelData['Duration'], color='blue')
plt.show()

#Delete unnecesary variables
del modelData['Date']
del modelData['Location']
del modelData['Month']
#Check data out to see if it looks right
modelData.head(100)


durationCat = modelData[['Duration']]
typeCat = modelData[['Type']]


#Split into train set and test set where test set is properties sold in december
trainData = modelData[modelData.Month != 12]
trainData.info()
testData = modelData[modelData.Month == 12]
testData.info()

#This is our independent("response") varible since we want to predict the price of the house
trainPrice = trainData['Price']


#Fit random forest model
 from sklearn.ensemble import RandomForestRegressor
  ranForReg = RandomForestRegressor()
  ranForReg.fit(trainData, trainData['Price'])

#Get cross validation scored with 10-fold cross-validation
from sklearn.model_selection import cross_val_score
  myScores = cross_val_score(ranForReg, trainData, trainPrice,  scoring="neg_mean_squared_error", cv=10)
  tree_rmse_scores = np.sqrt(-myScores)
  
 
#Display the errors of the model that is the mean of the root squared mean errors and the standard deviation
def displayScores(myScores):
   print("Scores:", myScores)
   print("Mean:", myScores.mean())
   print("Standard deviation:", myScores.std())

#Check how well it does compared to the mean of the price
tree_rmse_scores.mean() / trainPrice.mean()


#Finetune the model, use cross validation to check which values for the hyperparamters give the lowest errors
from sklearn.model_selection import GridSearchCV
param_grid = [
 {'n_estimators': [5,10,15,20,25,30], 'max_features': [2, 4, 6, 8]},
 {'bootstrap': [False], 'n_estimators': [5, 10], 'max_features': [2, 3, 4]},
 ]
forest_reg = RandomForestRegressor()
grid_search = GridSearchCV(forest_reg, param_grid, cv=5,
 scoring='neg_mean_squared_error',
return_train_score=True)
grid_search.fit(trainData, trainPrice)

#See the results of best hyperparameters, 
grid_search.cv_results_
grid_search.best_estimator_
grid_search.best_params_


rom sklearn.ensemble import RandomForestRegressor
  ranForReg = RandomForestRegressor()
  ranForReg.fit(trainData, trainData['Price'])

#Check out which features are most important
 feature_importances = grid_search.best_estimator_.feature_importances_
feature_importances


#get the response variable for the test set
testPrice = testData['Price']

#Define our final model with the tuned hyperparameters
finalModel = grid_search.best_estimator_

#Get root squared mean errors for the test set, that is see how well the model predicts on the testing set and compare to the mean of the price
finalPreds = finalModel.predict(testData)
final_mse = mean_squared_error(testPrice, finalPreds)
final_rmse = np.sqrt(final_mse) 
final_rmse
medianPrice = modelData['Price'].median()

#Compare to mean
final_rmse/testPrice.median()

#Get root mean squared forecasting error
SE = (finalPreds - testPrice) ** 2 
SFE = SE.divide(testPrice**2) 
MSFE = SFE.mean() 
RMSFE = np.sqrt(MSFE)
RMSFE


