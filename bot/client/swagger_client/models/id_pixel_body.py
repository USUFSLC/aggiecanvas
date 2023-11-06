# coding: utf-8

"""
    Elysia Documentation

    Development documentation  # noqa: E501

    OpenAPI spec version: 0.0.0
    
    Generated by: https://github.com/swagger-api/swagger-codegen.git
"""

import pprint
import re  # noqa: F401

import six

class IdPixelBody(object):
    """NOTE: This class is auto generated by the swagger code generator program.

    Do not edit the class manually.
    """
    """
    Attributes:
      swagger_types (dict): The key is attribute name
                            and the value is attribute type.
      attribute_map (dict): The key is attribute name
                            and the value is json key in definition.
    """
    swagger_types = {
        'column': 'int',
        'row': 'int',
        'color': 'int'
    }

    attribute_map = {
        'column': 'column',
        'row': 'row',
        'color': 'color'
    }

    def __init__(self, column=None, row=None, color=None):  # noqa: E501
        """IdPixelBody - a model defined in Swagger"""  # noqa: E501
        self._column = None
        self._row = None
        self._color = None
        self.discriminator = None
        self.column = column
        self.row = row
        self.color = color

    @property
    def column(self):
        """Gets the column of this IdPixelBody.  # noqa: E501


        :return: The column of this IdPixelBody.  # noqa: E501
        :rtype: int
        """
        return self._column

    @column.setter
    def column(self, column):
        """Sets the column of this IdPixelBody.


        :param column: The column of this IdPixelBody.  # noqa: E501
        :type: int
        """
        if column is None:
            raise ValueError("Invalid value for `column`, must not be `None`")  # noqa: E501

        self._column = column

    @property
    def row(self):
        """Gets the row of this IdPixelBody.  # noqa: E501


        :return: The row of this IdPixelBody.  # noqa: E501
        :rtype: int
        """
        return self._row

    @row.setter
    def row(self, row):
        """Sets the row of this IdPixelBody.


        :param row: The row of this IdPixelBody.  # noqa: E501
        :type: int
        """
        if row is None:
            raise ValueError("Invalid value for `row`, must not be `None`")  # noqa: E501

        self._row = row

    @property
    def color(self):
        """Gets the color of this IdPixelBody.  # noqa: E501


        :return: The color of this IdPixelBody.  # noqa: E501
        :rtype: int
        """
        return self._color

    @color.setter
    def color(self, color):
        """Sets the color of this IdPixelBody.


        :param color: The color of this IdPixelBody.  # noqa: E501
        :type: int
        """
        if color is None:
            raise ValueError("Invalid value for `color`, must not be `None`")  # noqa: E501

        self._color = color

    def to_dict(self):
        """Returns the model properties as a dict"""
        result = {}

        for attr, _ in six.iteritems(self.swagger_types):
            value = getattr(self, attr)
            if isinstance(value, list):
                result[attr] = list(map(
                    lambda x: x.to_dict() if hasattr(x, "to_dict") else x,
                    value
                ))
            elif hasattr(value, "to_dict"):
                result[attr] = value.to_dict()
            elif isinstance(value, dict):
                result[attr] = dict(map(
                    lambda item: (item[0], item[1].to_dict())
                    if hasattr(item[1], "to_dict") else item,
                    value.items()
                ))
            else:
                result[attr] = value
        if issubclass(IdPixelBody, dict):
            for key, value in self.items():
                result[key] = value

        return result

    def to_str(self):
        """Returns the string representation of the model"""
        return pprint.pformat(self.to_dict())

    def __repr__(self):
        """For `print` and `pprint`"""
        return self.to_str()

    def __eq__(self, other):
        """Returns true if both objects are equal"""
        if not isinstance(other, IdPixelBody):
            return False

        return self.__dict__ == other.__dict__

    def __ne__(self, other):
        """Returns true if both objects are not equal"""
        return not self == other
